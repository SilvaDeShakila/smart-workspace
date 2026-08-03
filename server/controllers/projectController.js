import Project from '../models/Project.js';
import { sendSuccess, sendError } from '../utils/response.js';

export async function listProjects(req, res) {
  try {
    const projects = await Project.find().populate('owner members', 'name email role');
    return sendSuccess(res, { projects });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
}

export async function createProject(req, res) {
  try {
    const project = await Project.create({ ...req.body, owner: req.user.id });
    return sendSuccess(res, { project }, 201);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
}

export async function updateProject(req, res) {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, { project });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
}

export async function deleteProject(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return sendError(res, 'Project not found', 404);
    return sendSuccess(res, { message: 'Project deleted' });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
}
