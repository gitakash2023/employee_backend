const _paginate = async (model, page = 1, pageSize = 10) => {
    try {
      const skip = (page - 1) * pageSize;
      
      const [data, count] = await Promise.all([
        model.find().skip(skip).limit(pageSize).exec(),
        model.countDocuments()
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
  