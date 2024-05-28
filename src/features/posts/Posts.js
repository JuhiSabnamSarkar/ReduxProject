// src/features/posts/Posts.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, createPost, updatePost, deletePost } from './postsSlice';
import { increment, decrement } from '../counters/counterSlice';

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(state => state.posts.posts);
    const postStatus = useSelector(state => state.posts.status);
    const error = useSelector(state => state.posts.error);
    const counter = useSelector(state => state.counter.value);

    useEffect(() => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
    }, [postStatus, dispatch]);

    const handleAddPost = () => {
        if (postStatus === 'idle') {
            dispatch(fetchPosts());
        }
        const newPost = {
            title: 'New Post',
            body: 'This is a new post'
        };
        dispatch(createPost(newPost));
    };

    const handleUpdatePost = (post) => {
        const updatedPost = { ...post, title: 'Updated Title' };
        dispatch(updatePost(updatedPost));
    };

    const handleDeletePost = (postId) => {
        dispatch(deletePost(postId));
    };

    return (
        <div>
            <h2>Posts</h2>
            <div>
                <button onClick={handleAddPost}>Add Post</button>
                <span>Posts: {posts.length}</span>
            </div>
            <br/><br/>
            <div>
                <button onClick={() => dispatch(increment())} style={{ backgroundColor: "red", color: 'white' }}>Increment Counter</button>
                <span>  Counter: {counter}   </span>
                <button onClick={() => dispatch(decrement())} style={{backgroundColor: "red", color: 'white'}}>Increment Counter</button>
            </div>
            <br /><br />
            {postStatus === 'loading' && <div>Loading...</div>}
            {postStatus === 'failed' && <div>{error}</div>}
            {postStatus === 'succeeded' && posts.map(post => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <button onClick={() => handleUpdatePost(post)}>Update</button>
                    <button onClick={() => handleDeletePost(post.id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default Posts;
