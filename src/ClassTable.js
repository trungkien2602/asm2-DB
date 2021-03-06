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
    { title: "M?? l???ch thi", field: "id_lichthi" },
    { title: "M?? m??n h???c", field: "id_monhoc", type: "text" },
    { title: "M?? s??? l???p", field: "id_lop" },
    { title: "T??n l???p", field: "ten" },
    { title: "H???c k??", field: "hocki", type: "text" },
    { title: "S??? sinh vi??n t???i ??a", field: "sinhvientoida" },
    { title: "S??? sinh vi??n hi???n c??", field: "sinhviendangki" },
  ];

  const columns2 = [
    { title: "M?? l???ch thi", field: "id_lichthi" },
    { title: "Ph??ng thi", field: "phongthi" },
    { title: "Ng??y thi", field: "ngaythi", type:"date" },
    { title: "Th???i gian ki???m tra", field: "thoigian" },
   
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
                tooltip: (!mode) ? "Xem l???ch thi" : "Ch???nh s???a l???ch thi",
                onClick: (event, rowData) => { if (!mode) { setMode(!mode); } else { setLich(rowData); toggleInsertLich(); } },
              },
            ]}
            columns={(!mode) ? columns : columns2}
            data={data}
            title="Qu???n l?? th??ng tin L???p h???c ph???n - L???ch thi"
            icons={tableIcons}
          />
          <button class='chanh-button-view' type="button" onClick={toggleInsert}>Th??m l???p h???c ph???n</button>
        </Col>
        <Modal className="edit" isOpen={insertClass} toggle={toggleInsert}>
          <CardHeader className="edit_label">Th??m l???p h???c ph???n</CardHeader>
          <label>M?? l???p h???c</label>
          <Input name="id_lop" value={newClass.id_lop} onChange={(e) => { newClass.id_lop = e.target.value; }} required />
          <label>T??n l???p</label>
          <Input name="ten" value={newClass.ten} onChange={(e) => { newClass.ten = e.target.value }} required />
          <label>H???c k??</label>
          <Input name="hocki" value={newClass.hocki} onChange={(e) => { newClass.hocki = e.target.value; }} required />
          <label>M??n h???c</label>
          <Input name="id_monhoc" value={newClass.id_monhoc} onChange={(e) => { newClass.id_monhoc = e.target.value }} required />
          <label>S??? sinh vi??n t???i ??a</label>
          <Input name="sinhvientoida" value={newClass.sinhvientoida} onChange={(e) => { newClass.sinhvientoida = e.target.value }} required />
          {(!insertClass) ?
            <button class='chanh-button-view' type="button" onClick={editClass}>Ch???nh s???a</button> :
            <button class='chanh-button-view edit_btn' type="button" onClick={submitClass}>Th??m m???i</button>
          }
        </Modal>

        <Modal className="edit" isOpen={insertLich} toggle={toggleInsertLich}>
          <CardHeader className="edit_label">Ch???nh s???a l???ch thi</CardHeader>
          <label>M?? l???ch thi: {tempLich.id_lichthi}</label>
          <br/>
          <br/>
          <label>Ph??ng thi</label>
          <Input name="phongthi" defaultValue={tempLich.phongthi} onChange={(e) => { tempLich.phongthi = e.target.value }} required />
          <label>Ng??y thi</label>
          <Input name="ngaythi" defaultValue={moment(tempLich.ngaythi).format('YYYY-MM-DD')} type="date"  onChange={(e) => { tempLich.ngaythi = e.target.value; }}  />
          <label>Th???i gian</label>
          <Input name="thoigian" defaultValue={tempLich.thoigian} onChange={(e) => { tempLich.thoigian = e.target.value }} required />
          {/* <label>M?? l???ch thi</label> */}
          {/* <Input name="id_lichthi" defaultValue={tempLich.id_lichthi} onChange={(e) => { tempLich.id_lichthi = e.target.value }} required /> */}
          
           <button class='chanh-button-view edit_btn' type="button" onClick={editLich}>Ch???nh s???a</button> 
            {/* <button class='chanh-button-view' type="button" onClick={(e) => { subnewLich(); }}>Th??m m???i</button> */}
        </Modal>
      </Row>

    </Container>
  )

}




export default ClassTable;