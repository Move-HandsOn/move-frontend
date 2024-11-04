import postsData from '../mocks/postsData.json';

export const deletePost = (id: number) => {
  const postIndex = postsData.findIndex((post) => post.id === id);
  if (postIndex !== -1) {
    postsData.splice(postIndex, 1);
    console.log(`Postagem com ID ${id} foi excluída.`);
    return true;
  }
  console.log(`Postagem com ID ${id} não encontrada.`);
  return false;
};
