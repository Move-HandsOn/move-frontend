import postsData from '../mocks/postsData.json';

export const deletePost = (id: string) => {
  const postIndex = postsData.findIndex((post) => post.id === id);
  if (postIndex !== -1) {
    postsData.splice(postIndex, 1);
    return true;
  }

  return false;
};
