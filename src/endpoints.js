const userAPI = 'https://reqres.in/';
const otherApi='https://jsonplaceholder.typicode.com/'
const ENDPOINTS = {
  userLogin: `${userAPI}api/login`,
  getPosts: `${otherApi}posts`,
  getPostComments:`${otherApi}comments?postId=`,
  getAlbum:`${otherApi}albums`,
  getPhotos:`${otherApi}photos`,
  getTodos:`${otherApi}todos?userId=`,
  updateTask:`${otherApi}todos/`,
  addTask:`${otherApi}todos`,
};

export default ENDPOINTS;
