import express from 'express';
import mongoose from 'mongoose';

import Uploads from '../models/uploads.js';

const router = express.Router();

export const getAll = async (req, res) => { 
    try {
        const uploads = await Uploads.find();
                
        res.status(200).json(uploads);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const get = async (req, res) => { 
    const { id } = req.params;

    try {
        const post = await Uploads.findById(id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const create= async (req, res) => {
    const { title, message, selectedFile, creator, tags } = req.body;

    const newPostMessage = new Uploads({ title, message, selectedFile, creator, tags })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}



export const del = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    await Uploads.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully." });
}

export const like = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Uploads.findById(id);

    const updatedPost = await Uploads.findByIdAndUpdate(id, { likeCount: post.likeCount + 1 }, { new: true });
    
    res.json(updatedPost);
}


export default router;