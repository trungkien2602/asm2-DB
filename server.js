
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
var mysql = require("mysql");
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
//Initializing connection string
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'asm2_DB'
  });
app.get('/ping',(req, res)=> {
    connection.query("SELECT * FROM chuyende", (err,result)=>{
        res.json(result)
    })
});
var body={};



app.get('/get/lophocphan',(req,res)=>{
    connection.query(`SELECT * FROM LOPHOCPHAN LEFT JOIN LICHTHI_HOCPHAN ON LOPHOCPHAN.id_lichthi=LICHTHI_HOCPHAN.id_lichthi`, (err,result)=>{
        
        res.json(result)
    });
})

app.post('/insert/lichthi',(req,res)=>{
    connection.query(`INSERT INTO LICHTHI_HOCPHAN VALUES ("${body.id_lichthi}","${body.phongthi}","${body.ngaythi}","${body.thoigian}")`, (err,result)=>{
        res.json(result)
    });
})

app.get('/set/body',(req,res)=>{
body=req.query;
res.json("done");
})
app.post('/update/lichthi',(req,res)=>{
    // var e=req;
    // console.log(req)
    sql=`UPDATE LICHTHI_HOCPHAN 
    SET phongthi="${body.phongthi}",thoigian= "${body.thoigian}",ngaythi="${body.ngaythi}"
    WHERE id_lichthi="${body.id_lichthi}";`
console.log(sql);
    connection.query(sql, (err,result)=>{
        res.json("thành công")
    });
})


app.post('/insert/lophocphan',(req,res)=>{
    var e=req.body.params;
    connection.query(
        `INSERT INTO LOPHOCPHAN VALUES("${e.id_lop}","${e.ten}","${e.hocki}",${e.sinhvientoida},0,"${e.id_monhoc}",NULL)`
        , (err,result)=>{
            res.json(result)
        });
});
app.post('/update/lophocphan',(req,res)=>{
    var e=req.body.params;
    connection.query(
        `UPDATE LOPHOCPHAN SET id_lop="${e.id_lop}", ten="${e.ten}",hocki="${e.hocki}",sinhvientoida = ${e.sinhvientoida},id_monhoc="${e.id_monhoc}"`
        , (err,result)=>{
            res.json(result)
        });
});

app.listen(process.env.PORT || 4000);