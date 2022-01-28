const sortBlogsByLikes = (blogsToSort) => {
  return [...blogsToSort].sort((previous, next) => previous.likes > next.likes ? 1 : -1).reverse()
}

const toExport = {
  sortBlogsByLikes
}

export default toExport