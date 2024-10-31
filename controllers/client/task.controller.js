const Task = require("../../models/task.model");

module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Sort 
  const sort = {};

  if(req.query.sortKey && req.query.sortValue){
    sort[req.query.sortKey] = req.query.sortValue;
  }
  // End sort 

  // Pagination 
  let limitItem = 4; 
  let page = 1; 

  if (req.query.page) {
    page = req.query.page;
  }

  if (req.query.limitItem) {
    limitItem = req.query.limitItem;
  }

  const skip = (page - 1) * limitItem;
  // End Pagination 


  const tasks = await Task
    .find(find)
    .limit(limitItem)
    .skip(skip)
    .sort(sort);

  res.json(tasks);
}

module.exports.detail = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findOne({
    _id: id,
    deleted: false
  });
  res.json(task);
}