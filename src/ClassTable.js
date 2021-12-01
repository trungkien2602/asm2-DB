import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
import axios from 'axios';
import { Modal } from 'reactstrap';
import { Input } from 'reactstrap';
import { CardHeader } from 'reactstrap';
import { useState } from 'react';
import { Row, Col } from 'reactstrap';
import MaterialTable from 'material-table';
import { FaEdit, FaCalendar } from "react-icons/fa";
import moment from 'moment';
import tableIcons from './MaterialTableIcons';
//import {FaEdit} from 'react-icons';

const ClassTable = () => {

  const [data, setData] = useState([]);
  const [insertClass, setInsertClass] = useState(false);
  const [modal, setModal] = useState(false);
  const [insertLich, setInsertLich] = useState(false);
  const [modalLich, setModalLich] = useState(false);
  var newClass = {};
  var [newLich, setLich] = useState({ "id_lop": "L01", "ten": "Lop hoc phan 01", "hocki": "HK1", "sinhvientoida": 110, "sinhviendangki": 99, "id_monhoc": "145", "id_lichthi": "LT01", "phongthi": "201", "ngaythi": "2021-12-12T17:00:00.000Z", "thoigian": "90 phut" });
  var tempLich = newLich;
  const checkData = () => {
    axios.get('/get/lophocphan').then(res => {
      console.log(res.data);
      setData(res.data);
    }
    )//.then(() => setDisplay(data));
  }
  useEffect(() => {
    setTimeout(() => {
      checkData();
    }, 100);
  }, []);
  const toggleInsert = () => {
    setInsertClass(!insertClass);
    toggleModal();
  }
  const toggleInsertLich = () => {
    setInsertLich(!insertLich);
    toggleModalLich();
  }
  const toggleModal = () => {
    setModal(!modal);
  }
  const toggleModalLich = () => {
    setModalLich(!modalLich);
  }
  const subnewLich = () => {
    axios.get('/set/body', { params: newLich }).then(() => {
      axios.post('/insert/lichthi' ).then(() =>{

      checkData();
    toggleModal();
      }
      )
    })
    
  }
  const editLich = () => {
    setLich(tempLich);
    axios.get('/set/body', { params: newLich }).then(() => {
      axios.post('/update/lichthi').then((res) =>{
        checkData();
      toggleModalLich();})
    }
    );

  }
  const submitClass = () => {
    axios.post('/insert/lophocphan', { params: newClass }).then(() =>
      checkData())
    toggleModalLich();
  }
  const editClass = () => {
    axios.post('/update/lophocphan', { params: newClass }).then(() =>
      checkData())
    toggleModal();
  }
  const [mode, setMode] = useState(false);
  const columns = [
    { title: "Mã lịch thi", field: "id_lichthi" },
    { title: "Mã môn học", field: "id_monhoc", type: "text" },
    { title: "Mã số lớp", field: "id_lop" },
    { title: "Tên lớp", field: "ten" },
    { title: "Học kì", field: "hocki", type: "text" },
    { title: "Số sinh viên tối đa", field: "sinhvientoida" },
    { title: "Số sinh viên hiện có", field: "sinhviendangki" },
  ];

  const columns2 = [
    { title: "Mã lịch thi", field: "id_lichthi" },
    { title: "Phòng thi", field: "phongthi" },
    { title: "Ngày thi", field: "ngaythi", type:"date" },
    { title: "Thời gian kiểm tra", field: "thoigian" },
   
  ];
  return (
    <Container >
      <Row><Col xs={1} />
        <Col className="main_inter">
          <MaterialTable style={{ zIndex: 0 }}
            options={{
              search: true,
              exportButton: true,
              sorting: true,
            }}
            actions={[
              {
                icon: FaCalendar,
                tooltip: (!mode) ? "Xem lịch thi" : "Chỉnh sửa lịch thi",
                onClick: (event, rowData) => { if (!mode) { setMode(!mode); } else { setLich(rowData); toggleInsertLich(); } },
              },
            ]}
            columns={(!mode) ? columns : columns2}
            data={data}
            title="Quản lý thông tin Lớp học phần - Lịch thi"
            icons={tableIcons}
          />
          <button class='chanh-button-view' type="button" onClick={toggleInsert}>Thêm lớp học phần</button>
        </Col>
        <Modal className="edit" isOpen={insertClass} toggle={toggleInsert}>
          <CardHeader className="edit_label">Thêm lớp học phần</CardHeader>
          <label>Mã lớp học</label>
          <Input name="id_lop" value={newClass.id_lop} onChange={(e) => { newClass.id_lop = e.target.value; }} required />
          <label>Tên lớp</label>
          <Input name="ten" value={newClass.ten} onChange={(e) => { newClass.ten = e.target.value }} required />
          <label>Học kì</label>
          <Input name="hocki" value={newClass.hocki} onChange={(e) => { newClass.hocki = e.target.value; }} required />
          <label>Môn học</label>
          <Input name="id_monhoc" value={newClass.id_monhoc} onChange={(e) => { newClass.id_monhoc = e.target.value }} required />
          <label>Số sinh viên tối đa</label>
          <Input name="sinhvientoida" value={newClass.sinhvientoida} onChange={(e) => { newClass.sinhvientoida = e.target.value }} required />
          {(!insertClass) ?
            <button class='chanh-button-view' type="button" onClick={editClass}>Chỉnh sửa</button> :
            <button class='chanh-button-view edit_btn' type="button" onClick={submitClass}>Thêm mới</button>
          }
        </Modal>

        <Modal className="edit" isOpen={insertLich} toggle={toggleInsertLich}>
          <CardHeader className="edit_label">Chỉnh sửa lịch thi</CardHeader>
          <label>Mã lịch thi: {tempLich.id_lichthi}</label>
          <br/>
          <br/>
          <label>Phòng thi</label>
          <Input name="phongthi" defaultValue={tempLich.phongthi} onChange={(e) => { tempLich.phongthi = e.target.value }} required />
          <label>Ngày thi</label>
          <Input name="ngaythi" defaultValue={moment(tempLich.ngaythi).format('YYYY-MM-DD')} type="date"  onChange={(e) => { tempLich.ngaythi = e.target.value; }}  />
          <label>Thời gian</label>
          <Input name="thoigian" defaultValue={tempLich.thoigian} onChange={(e) => { tempLich.thoigian = e.target.value }} required />
          {/* <label>Mã lịch thi</label> */}
          {/* <Input name="id_lichthi" defaultValue={tempLich.id_lichthi} onChange={(e) => { tempLich.id_lichthi = e.target.value }} required /> */}
          
           <button class='chanh-button-view edit_btn' type="button" onClick={editLich}>Chỉnh sửa</button> 
            {/* <button class='chanh-button-view' type="button" onClick={(e) => { subnewLich(); }}>Thêm mới</button> */}
        </Modal>
      </Row>

    </Container>
  )

}




export default ClassTable;