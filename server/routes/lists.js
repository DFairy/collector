var express = require('express');
var router = express.Router();
var List = require('../models/lists');


/* GET users listing. */
//查询
router.post('/', function(req, res, next) {
    List.find({}, (err, listDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '查询失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '查询成功',
                result: listDoc
            })
        }
    })
});


//添加分类
router.post('/addTitle', function(req, res, next) {
    let titleItem = req.body.titleItem
    if (!titleItem) {
        res.json({
            status: '1',
            msg: 'titleItem为空',
            result: ''
        })
        return false
    }
    let list = new List({
        title: titleItem
    })
    list.save((err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '插入失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: 'title插入成功',
                result: titleItem + ''
            })
        }
    })
});

//删除分类
router.post('/del', function(req, res, next) {
    let titleItem = req.body.titleItem
    if (!titleItem) {
        res.json({
            status: '1',
            msg: '数值为空',
            result: ''
        })
        return false
    }
    List.remove({
        'title': titleItem
    }, (err, listDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '删除失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '删除成功',
                result: ''
            })
        }
    })
});

//添加网址
router.post('/addWeb', function(req, res, next) {
    let titleItem = req.body.titleItem;
    link = req.body.link,
        name = req.body.name,
        description = req.body.description;
    if (!titleItem) {
        res.json({
            status: '1',
            msg: '数值为空',
            result: ''
        })
        return false
    }
    List.updateOne({ title: titleItem }, {
        '$push': {
            children: {       
                link: link,
                title: name,
                description: description
            }
        }    
    }, (err, listDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '插入失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '插入成功',
                result: listDoc
            })
        }
    })

});


//删除网址
router.post('/delWeb', function(req, res, next) {
    let titleItem = req.body.titleItem;
    name = req.body.name;
    if (!titleItem) {
        res.json({
            status: '1',
            msg: '数值为空',
            result: ''
        })
        return false
    }
    List.updateOne({ title: titleItem }, {
        '$pull': {
            children: {       
                title: name
            }
        }    
    }, (err, listDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: '删除失败',
                result: ''
            })
        } else {
            res.json({
                status: '0',
                msg: '删除成功',
                result: listDoc
            })
        }
    })

});

module.exports = router;