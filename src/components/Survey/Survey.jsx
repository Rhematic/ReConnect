import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import LikertForm from '../LikertForm/LikertForm';
import FreeForm from '../FreeForm/FreeForm';
import BooleanForm from '../BooleanForm/BooleanForm';
import './Survey.css';


function Survey() {
  return (
    <div>
      <h2 className="survey-title">SURVEY</h2>
    
    <LikertForm />
    <FreeForm />
    <BooleanForm />
    </div>
  );
}

export default Survey;
