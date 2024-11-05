import postsData from '../mocks/postsData.json';

export const deletePost = (id: number) => {
  const postIndex = postsData.findIndex((post) => post.id === id);
  if (postIndex !== -1) {
    postsData.splice(postIndex, 1);
    return true;
  }

  return false;
};
