// Dùng express dựng server - FAirServer
// Biến app sẽ được khởi tạo, cài đặt cơ bản, thêm các route rồi export, ko listen tại đây
// Truyền biến db connection vào

const express = require('express');

/**
 * Trả về biến app đã được cấu hình
 * @param {Object} db
 * @return {Object} app
 */

function initServer(db){
    const app = new express();
//Khởi tạo

//Thêm route
    return app;
}


module.exports = initServer;