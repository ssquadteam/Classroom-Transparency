import React, { useEffect, useState } from 'react';
import './ClassRoutine.css';

// Import teacher images
import mrHasanImg from '../assets/teachers/mrhasan.jpg';
import msHenaImg from '../assets/teachers/mshena.jpg';
import mrRatulImg from '../assets/teachers/mrratul.jpg';
import mrSalamImg from '../assets/teachers/mrsalam.jpg';
import mrFaridImg from '../assets/teachers/mrfarid.jpg';
import msFalguniImg from '../assets/teachers/msfalguni.jpg';
import msSaniaImg from '../assets/teachers/mssania.jpg';
import mrEmamulImg from '../assets/teachers/mremamul.jpg';
import msBornaImg from '../assets/teachers/msbarna.jpg';
import msSajiaImg from '../assets/teachers/mssajia.jpg';
import missSuraiyaImg from '../assets/teachers/misssuraiya.jpg';
import mrDebnathImg from '../assets/teachers/mrdebanth.jpg'; // Note: This is using Mr. Hasan's image

const TeacherPopup = ({ teacher, onClose }) => {
    if (!teacher) return null;
  
    return (
      <div className="teacher-popup">
        <div className="teacher-popup-content">
          <img src={teacher.image} alt={teacher.name} />
          <h3>{teacher.name}</h3>
          <p>Position: {teacher.position}</p>
          <p>Department: {teacher.department}</p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

const ClassRoutine = () => {
    const [visible, setVisible] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState(null);

    useEffect(() => {
        setVisible(true);
    }, []);

    const teachers = {
        'Mr. Hasan': { name: 'Md. Abdul Hasan Biswas', position: 'Asst Teacher', department: 'Mathematics', image: mrHasanImg },
        'Ms. Hena': { name: 'Selina Ahter Hena', position: 'Asst. Teacher', department: 'Bangla', image: msHenaImg },
        'Mr. Ratul': { name: 'MD.Faizur Rahman Ratul', position: 'Asst. Teacher', department: 'English', image: mrRatulImg },
        'Mr. Salam': { name: 'Abdullah Ibn Salam', position: 'Asst teacher', department: 'Science and Technology', image: mrSalamImg },
        'Mr. Farid': { name: 'Mr. Farid', position: 'Asst teacher', department: 'Mathematics', image: mrFaridImg },
        'Ms. Falguni': { name: 'Falguny Happy', position: 'Asst teacher', department: 'Social Studies', image: msFalguniImg },
        'Ms. Sania': { name: 'Sania Kabir', position: 'Asst teacher', department: 'Mathematics', image: msSaniaImg },
        'Mr. Emamul': { name: 'Md.Emamul Hossain', position: 'Asst.teacher', department: 'English', image: mrEmamulImg },
        'Ms. Borna': { name: 'Naila Parvin Barna', position: 'Asst teacher', department: 'Social Studies', image: msBornaImg },
        'Ms. Sajia': { name: 'Sajia Sharmin', position: 'Asst teacher', department: 'Art And Culture', image: msSajiaImg },
        'Ms. Suraiya': { name: 'Suraiya Islam', position: 'Asst Teacher', department: 'Mathematics', image: missSuraiyaImg },
        'Mr. Debnath': { name: 'Mr. Debnath', position: 'Asst Teacher', department: 'Mathematics', image: mrDebnathImg },
    };

    const handleTeacherClick = (teacherName) => {
        setSelectedTeacher(teachers[teacherName]);
    };

    const closePopup = () => {
        setSelectedTeacher(null);
    };

    const renderTeacherName = (name) => (
        <span onClick={() => handleTeacherClick(name)} style={{cursor: 'pointer'}}>
            {name}
        </span>
    );

    return (
        <div className={`class-routine ${visible ? 'visible' : ''}`}>
            <h2>Class 9 Routine</h2>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>P1</th>
                            <th>P2</th>
                            <th>P3</th>
                            <th>R</th>
                            <th>P4</th>
                            <th>P5</th>
                            <th>P6</th>
                            <th>P7</th>
                            <th>P8</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Sun</td>
                            <td>Bengali<br/>{renderTeacherName('Ms. Hena')}</td>
                            <td>English<br/>{renderTeacherName('Mr. Ratul')}</td>
                            <td>D.T<br/>{renderTeacherName('Mr. Salam')}</td>
                            <td>Recess</td>
                            <td>S.T.E.M<br/>{renderTeacherName('Mr. Farid')}</td>
                            <td>L&L<br/>{renderTeacherName('Ms. Falguni')}</td>
                            <td>Wellbeing<br/>{renderTeacherName('Ms. Sania')}</td>
                            <td>Eng-II<br/>{renderTeacherName('Mr. Emamul')}</td>
                            <td>Science<br/>{renderTeacherName('Mr. Salam')}</td>
                        </tr>
                        <tr>
                            <td>Mon</td>
                            <td>Bengali<br/>{renderTeacherName('Ms. Hena')}</td>
                            <td>Wellbeing<br/>{renderTeacherName('Ms. Sania')}</td>
                            <td>H.S.S<br/>{renderTeacherName('Ms. Borna')}</td>
                            <td>Recess</td>
                            <td>S.T.E.M<br/>{renderTeacherName('Mr. Farid')}</td>
                            <td>Maths<br/>{renderTeacherName('Mr. Hasan')}</td>
                            <td>L&L<br/>{renderTeacherName('Ms. Falguni')}</td>
                            <td>Eng-II<br/>{renderTeacherName('Mr. Emamul')}</td>
                            <td>Science<br/>{renderTeacherName('Mr. Salam')}</td>
                        </tr>
                        <tr>
                            <td>Tue</td>
                            <td>Bengali<br/>{renderTeacherName('Ms. Hena')}</td>
                            <td>English<br/>{renderTeacherName('Mr. Ratul')}</td>
                            <td>H.S.S<br/>{renderTeacherName('Ms. Borna')}</td>
                            <td>Recess</td>
                            <td>S.T.E.M<br/>{renderTeacherName('Mr. Farid')}</td>
                            <td>Maths<br/>{renderTeacherName('Mr. Hasan')}</td>
                            <td>Art & Culture<br/>{renderTeacherName('Ms. Sajia')}</td>
                            <td>Eng-II<br/>{renderTeacherName('Mr. Emamul')}</td>
                            <td>Science<br/>{renderTeacherName('Mr. Salam')}</td>
                        </tr>
                        <tr>
                            <td>Wed</td>
                            <td>Bengali<br/>{renderTeacherName('Ms. Hena')}</td>
                            <td>English<br/>{renderTeacherName('Mr. Ratul')}</td>
                            <td>H.S.S<br/>{renderTeacherName('Ms. Borna')}</td>
                            <td>Recess</td>
                            <td>S.T.E.M<br/>{renderTeacherName('Mr. Farid')}</td>
                            <td>Maths<br/>{renderTeacherName('Mr. Hasan')}</td>
                            <td>Religion<br/>{renderTeacherName('Ms. Suraiya')}<br/>or {renderTeacherName('Mr. Debnath')}</td>
                            <td>Eng-II<br/>{renderTeacherName('Mr. Emamul')}</td>
                            <td>Science<br/>{renderTeacherName('Mr. Salam')}</td>
                        </tr>
                        <tr>
                            <td>Thu</td>
                            <td>Bengali<br/>{renderTeacherName('Ms. Hena')}</td>
                            <td>English<br/>{renderTeacherName('Mr. Ratul')}</td>
                            <td>H.S.S<br/>{renderTeacherName('Ms. Borna')}</td>
                            <td>Recess</td>
                            <td>Art & Culture<br/>{renderTeacherName('Ms. Sajia')}</td>
                            <td>Maths<br/>{renderTeacherName('Mr. Hasan')}</td>
                            <td>Religion<br/>{renderTeacherName('Ms. Suraiya')}<br/>or {renderTeacherName('Mr. Debnath')}</td>
                            <td>Eng-II<br/>{renderTeacherName('Mr. Emamul')}<br/>{renderTeacherName('Mr. Ratul')}</td>
                            <td>BEL<br/>{renderTeacherName('Mr. Emamul')}<br/>or {renderTeacherName('Ms. Hena')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <TeacherPopup teacher={selectedTeacher} onClose={closePopup} />
        </div>
    );
};

export default ClassRoutine;