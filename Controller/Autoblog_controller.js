const axios = require('axios');
const cron = require('node-cron');
const Blog = require('../Model/Add_Blog')
// Function to interact with the OpenAI API and generate blog post content
const Autoblog_controller = async(req,res)=>{


async function generateBlogPost() {
    try {
        // Send a prompt to the OpenAI API
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003', // Specify the model to use
            prompt: 'Write a blog post about...', // Provide a prompt for the model
            max_tokens: 500, // Set the maximum number of tokens for the response
            temperature: 0.7, // Adjust temperature to control randomness of the response
            n: 1 // Specify the number of completions to generate
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Blog_api' // Replace with your OpenAI API key
            }
        });

        // Extract the generated content from the response
        // const generatedContent = response.data.choices[0].text.trim();

        // Save the generated content to your blog platform or database
        // saveBlogPost(generatedContent);

        // console.log('Blog post generated and saved successfully.');
    } catch (error) {
        console.error('Error generating blog post:', error);
    }
}

// Function to save the generated content to your blog platform or database
const saveBlogPost = async(content)=>{

  
  try {
     // Replace 'blogPosts' with your collection name
    await Blog.insertOne({ content });
    console.log('Blog post saved to MongoDB');
    
} catch (error) {
    console.error('Error saving blog post to MongoDB:', error);
    throw error;
}
}

// Schedule the generateBlogPost function to run periodically (e.g., once a day)
// You can use a library like node-cron for this purpose
// Example: run generateBlogPost function every day at 9:00 AM
// cron.schedule('0 9 * * *', generateBlogPost);
}
module.exports = Autoblog_controller