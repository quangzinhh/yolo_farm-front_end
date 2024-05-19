import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
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
    const newPumpStatus = !isPumpOn ? 1 : 0; // Sử dụng isPumpOn thay vì setIsPumpOn
  
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
  

  const handleHourChange = (event) => {
    setSelectedHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setSelectedMinute(event.target.value);
  };

  return (
    <>
    <Row>
    <h1 style={{width:'100%', textAlign:'center', marginBottom:'30px'}}>Điều khiển thiết bị</h1>
    </Row>
    <Row style={{margin:'0 20%'}}>
      <Col>
      <div className="turn">
        <h3>Đèn</h3>
        <div className="bar" onClick={ControlLight}>
          <div className={`light ${isLightOn ? 'on' : 'off'}` } style={{ left: `${barLightPosition}%` }}></div>
        </div>
      </div>
      </Col>
      <Col>
      <div className="turn">
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
    {scheduleMode && (
      <Row style={{width:'100%', alignItems:'center', justifiedContent:'center'}}>
        {/* Hiển thị nội dung lịch ở đây */}
        <p className="mb-3" style={{marginLeft:'33%', marginRight:'10px'}}>Bật máy bơm vào lúc: </p>
        <Form.Group as={Row} className="mb-3">
          <Col>
            <Form.Control type="number" placeholder="Giờ" min="0" max="23" value={selectedHour} onChange={handleHourChange} />
          </Col>
          <Col>
            <Form.Control type="number" placeholder="Phút" min="0" max="59" value={selectedMinute} onChange={handleMinuteChange} />
          </Col>
        </Form.Group>
        <button className="mb-3 ml-3" style={{backgroundColor:'rgb(161, 224, 242)', border: 'none', padding:'5px', fontWeight:'bold', borderRadius:'4px'}}>Lưu</button>
      </Row>
    )}
  </>
  );
};

export default CityComponent;
