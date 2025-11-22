import ServiceRequest from '../models/ServiceRequest.js';
import Contact from '../models/Contact.js';
import User from '../models/User.js';
import { sendServiceRequestEmail } from '../utils/email.js';

export const createServiceRequest = async (req, res) => {
  try {
    const { name, email, company, phone, service, projectBrief, budget } = req.body;
    const files = req.files || [];

    if (!name || !email || !phone || !service || !projectBrief) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if user exists by email
    const user = await User.findOne({ email: email.toLowerCase().trim() });

    // Prepare file data (store file info, not actual files - in production, upload to cloud storage)
    const fileData = files.map(file => ({
      filename: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      // In production, upload to cloud storage (UploadThing, S3, etc.) and store URL here
      // url: uploadedFileUrl
    }));

    const serviceRequest = await ServiceRequest.create({
      userId: user?._id || null,
      name,
      email: email.toLowerCase().trim(),
      company,
      phone,
      service,
      projectBrief,
      budget,
      files: fileData,
      status: 'pending',
    });

    // Also create a Contact entry so it shows up in Admin Contacts
    const contactMessage = `Service Request: ${service}\n\nProject Brief:\n${projectBrief}\n\nBudget: ${budget || 'Not specified'}\n\nCompany: ${company || 'Not specified'}`;
    
    const contact = await Contact.create({
      name,
      email: email.toLowerCase().trim(),
      phone: phone || null,
      whatsapp: null,
      subject: `Service Request: ${service}`,
      message: contactMessage,
      service: service || null,
      source: 'service_request', // New source type for service requests
      userId: user?._id || null,
      ticketId: null,
      status: 'new',
    });

    console.log('Contact created from service request:', {
      id: contact._id,
      name: contact.name,
      email: contact.email,
      source: contact.source,
      service: contact.service,
    });

    // If user exists, add notification
    if (user) {
      const notificationMessage = `Your service request for "${service}" has been received. We'll contact you soon.`;
      if (notificationMessage && notificationMessage.trim()) {
        user.notifications.push({
          message: notificationMessage.trim(),
          type: 'system', // Changed from 'service' to 'system' as 'service' is not in enum
          read: false,
        });
        await user.save();
      }
    }

    // Send email notification (optional)
    // await sendServiceRequestEmail(email, name, service);

    res.status(201).json({
      message: 'Service request submitted successfully',
      requestId: serviceRequest._id,
    });
  } catch (error) {
    console.error('Error creating service request:', error);
    res.status(500).json({ message: error.message || 'Failed to submit service request. Please try again.' });
  }
};

export const getServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



