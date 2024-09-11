const _paginate = async (model, page = 1, pageSize = 10, filter = {}) => {
  try {
      const skip = (page - 1) * pageSize;

      const [data, count] = await Promise.all([
          model.find(filter).skip(skip).limit(pageSize).exec(),
          model.countDocuments(filter)
      ]);

      const totalPages = Math.ceil(count / pageSize);

      return {
          currentPage: page,
          totalPages,
          totalCount: count,
          data
      };
  } catch (error) {
      throw new Error(error.message);
  }
};

module.exports = {
  _paginate
};
