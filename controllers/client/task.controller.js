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

  // Search
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  // End Search

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

module.exports.changeMultiPatch = async (req, res) => {
  const status = req.body.status;
  const ids = req.body.ids;

  await Task.updateMany({
    _id: { $in: ids }
  }, {
    status: status
  });

  res.json({
    code: "success",
    message: "Thành công!"
  });
}

module.exports.createPost = async (req, res) => {
  const data = req.body;

  const task = new Task(data);
  await task.save();

  res.json({
    code: "success", 
    message: "Tạo công việc thành công!", 
    data: task
  });
}

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  await Task.updateOne({
    _id: id
  }, data);

  res.json({
    code: "success",
    message: "Cập nhật công việc thành công!"
  });
}

module.exports.deleteMultiPatch = async (req, res) => {
  const ids = req.body.ids;
  
  await Task.updateMany({
    _id: { $in: ids }
  }, {
    deleted: true
  });

  res.json({
    code: "success", 
    message: "Xoá thành công!"
  });
}
