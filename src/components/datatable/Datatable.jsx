import React, { useState, useEffect } from 'react';
import { Row, Col, Form, Table, Button } from 'react-bootstrap';
import ToggleSwitch from './ToggleSwitch.js'; // Import ToggleSwitch component
import './datatable.scss';

const CityComponent = () => {
  const [isLightOn, setIsLightOn] = useState(false);
  const [barLightPosition, setBarLightPosition] = useState(0);
  const [isPumpOn, setIsPumpOn] = useState(false);
  const [barPumpPosition, setBarPumpPosition] = useState(0);
  const [autoMode, setAutoMode] = useState(false); // State for automatic mode
  const [scheduleMode, setScheduleMode] = useState(false); // State for scheduled mode
  const [selectedHour, setSelectedHour] = useState(''); // State for selected hour
  const [selectedMinute, setSelectedMinute] = useState('');
  const [lightSchedules, setLightSchedules] = useState([]); // State for light schedules
  const [pumpSchedules, setPumpSchedules] = useState([]); // State for pump schedules
  const [pumpUpperBound, setPumpUpperBound] = useState([]);
  const [pumpLowerBound, setPumpLowerBound] = useState([]);


  // Fetch schedules from server (replace with actual API endpoints)
  useEffect(() => {
    fetch('http://127.0.0.1:8000/get_light_schedules/')
      .then(response => response.json())
      .then(data => setLightSchedules(data))
      .catch(error => console.error('Error:', error));

    fetch('http://127.0.0.1:8000/get_pump_schedules/')
      .then(response => response.json())
      .then(data => setPumpSchedules(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
  };

  const handleUpperChange = (event) => {
    setPumpUpperBound(event.target.value);
  };

  const handleLowerChange = (event) => {
    setPumpLowerBound(event.target.value);
  };

  const handleDeleteLightSchedule = (id) => {
    fetch(`http://127.0.0.1:8000/delete_light_schedule/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setLightSchedules(lightSchedules.filter(schedule => schedule.id !== id));
        } else {
          throw new Error('Failed to delete schedule');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const handleDeletePumpSchedule = (id) => {
    fetch(`http://127.0.0.1:8000/delete_pump_schedule/${id}/`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setPumpSchedules(pumpSchedules.filter(schedule => schedule.id !== id));
        } else {
          throw new Error('Failed to delete schedule');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const ControlLight = () => {
    setIsLightOn(prevState => !prevState);
    setBarLightPosition(prevPosition => prevPosition === 0 ? 40 : 0);

    const newLightStatus = isLightOn ? 0 : 1;

    fetch('http://127.0.0.1:8000/control_light/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ light_status: newLightStatus }),
    })
      .then(response => {
        if (response.ok) {
          setIsLightOn(!isLightOn); // Toggle the state if the request is successful
        } else {
          throw new Error('Failed to toggle light');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  const togglePump = () => {
    setIsPumpOn(prevState => !prevState);
    setBarPumpPosition(prevPosition => prevPosition === 0 ? 40 : 0);
    const newPumpStatus = !isPumpOn ? 1 : 0;

    fetch('http://127.0.0.1:8000/control_water/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ water: newPumpStatus }),
    })
      .then(response => {
        if (response.ok) {
          setIsPumpOn(!isPumpOn); // Cập nhật trạng thái bơm
        } else {
          throw new Error('Failed to toggle pump');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <Row>
        <h1 style={{width:'100%', textAlign:'center', marginBottom:'30px'}}>Điều khiển thiết bị</h1>
      </Row>
      <Row style={{margin:'0 20%'}}>
        <Col>
          <div className="turn widget" style={{marginBottom: '10px'}}>
            <h3>Đèn</h3>
            <div className="bar" onClick={ControlLight}>
              <div className={`light ${isLightOn ? 'on' : 'off'}` } style={{ left: `${barLightPosition}%` }}></div>
            </div>
          </div>
        </Col>
        <Col>
          <div className="turn widget">
            <h3>Máy bơm</h3>
            <div className="bar" onClick={togglePump}>
              <div className={`light ${isPumpOn ? 'on' : 'off'}` } style={{ left: `${barPumpPosition}%` }}></div>
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{marginTop:'50px'}}>
        <h1 style={{width:'100%', textAlign:'center', marginBottom:'30px'}}>Cài đặt thiết bị</h1>
      </Row>
      <Row style={{ display: 'flex', justifyContent: 'center' }}>
        <ToggleSwitch
          labelLeft="Điều khiển kích hoạt tự động"
          labelRight="Hẹn lịch kích hoạt tự động"
          leftChecked={autoMode}
          rightChecked={scheduleMode}
          onChangeLeft={() => {
            setAutoMode(true);
            setScheduleMode(false);
          }}
          onChangeRight={() => {
            setAutoMode(false);
            setScheduleMode(true);
          }}
        />
      </Row>
      {autoMode && (
        <Col>
          <Row style={{width:'100%', alignItems:'center', justifyContent: 'center', display: 'flex', margin: '10px'}}>
            <p>
              Ngưỡng bật máy bơm hiện tại:
            </p>
          </Row>
          <Row style={{width:'100%', alignItems:'center', justifyContent: 'center', display: 'flex', margin: '10px'}}>
            <p>
              Ngưỡng tắt máy bơm hiện tại:
            </p>
          </Row>
          <Row style={{width:'100%', alignItems:'center', justifiedContent:'center', display: 'flex'}}>
            <p className="mb-3" style={{marginLeft:'33%', marginRight:'10px', width: '180px'}}>Bật máy bơm nếu độ ẩm đất nhỏ hơn: </p>
            <Form.Group as={Row} className="mb-3 form-group">
              <Col>
                <Form.Control as="select" value={pumpLowerBound} onChange={handleLowerChange} className="form-select" aria-label="Select hour">
                  <option value="" disabled>Chọn % độ ẩm</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={i}>{i} %</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button className='saveTime'>Lưu</Button>
          </Row>
          <Row style={{width:'100%', alignItems:'center', justifiedContent:'center', display: 'flex', marginTop: '20px'}}>
            <p className="mb-3" style={{marginLeft:'33%', marginRight:'10px', width: '180px'}}>Tắt máy bơm nếu độ ẩm đất lớn hơn: </p>
            <Form.Group as={Row} className="mb-3 form-group">
              <Col>
              <Form.Control as="select" value={pumpUpperBound} onChange={handleUpperChange} className="form-select" aria-label="Select huid">
                  <option value="" disabled>Chọn % độ ẩm</option>
                  {Array.from({ length: 100 }, (_, i) => (
                    <option key={i} value={i}>{i} %</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button className='saveTime'>Lưu</Button>
          </Row>
        </Col>
      )}
      {scheduleMode && (
        <Col>
          <Row style={{width:'100%', alignItems:'center', justifiedContent:'center', display: 'flex'}}>
            <p className="mb-3" style={{marginLeft:'33%', marginRight:'10px', width: '180px'}}>Bật đèn vào lúc: </p>
            <Form.Group as={Row} className="mb-3 form-group">
              <Col>
                <Form.Control as="select" value={selectedHour} onChange={handleHourChange} className="form-select" aria-label="Select hour">
                  <option value="" disabled>Chọn Giờ</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Control as="select" value={selectedMinute} onChange={handleMinuteChange} className="form-select" aria-label="Select minute">
                  <option value="" disabled>Chọn Phút</option>
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button className='saveTime'>Lưu</Button>
          </Row>
          <Row style={{width:'100%', alignItems:'center', justifiedContent:'center', display: 'flex', marginTop: '20px'}}>
            <p className="mb-3" style={{marginLeft:'33%', marginRight:'10px', width: '180px'}}>Bật máy bơm vào lúc: </p>
            <Form.Group as={Row} className="mb-3 form-group">
              <Col>
                <Form.Control as="select" value={selectedHour} onChange={handleHourChange} className="form-select" aria-label="Select hour">
                  <option value="" disabled>Chọn Giờ</option>
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </Form.Control>
              </Col>
              <Col>
                <Form.Control as="select" value={selectedMinute} onChange={handleMinuteChange} className="form-select" aria-label="Select minute">
                  <option value="" disabled>Chọn Phút</option>
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>{i}</option>
                  ))}
                </Form.Control>
              </Col>
            </Form.Group>
            <Button className='saveTime'>Lưu</Button>
          </Row>
        </Col>
      )}
      {/* Bảng hiển thị lịch đèn */}
      <Row style={{marginTop: '20px'}}>
        <h2 style={{width:'100%', textAlign:'center', marginBottom:'20px'}}>Lịch trình đèn</h2>
        <Table striped bordered hover className='schedule-table'>
          <thead>
            <tr>
              <th>Giờ bắt đầu</th>
              <th>Giờ kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {lightSchedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.hour}</td>
                <td>{schedule.minute}</td>
                <td><Button variant="danger" onClick={() => handleDeleteLightSchedule(schedule.id)}>Xóa</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
      {/* Bảng hiển thị lịch máy bơm */}
      <Row style={{marginTop: '20px'}}>
        <h2 style={{width:'100%', textAlign:'center', marginBottom:'20px'}}>Lịch trình máy bơm</h2>
        <Table striped bordered hover className='schedule-table'>
          <thead>
            <tr>
              <th>Giờ bắt đầu</th>
              <th>Giờ kết thúc</th>
            </tr>
          </thead>
          <tbody>
            {pumpSchedules.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.hour}</td>
                <td>{schedule.minute}</td>
                <td><Button variant="danger" onClick={() => handleDeletePumpSchedule(schedule.id)}>Xóa</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </>
  );
};

export default CityComponent;
