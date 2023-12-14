import React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import BallotIcon from '@mui/icons-material/Ballot';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LabelBottomNavigation() {
    const [value, setValue] = React.useState('recents');
    const user = useSelector((store) => store.user);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}>
            {user.id && (user.access_level === 'parent') && (
                <>
                    <BottomNavigation
                        showLabels
                        sx={{ backgroundColor: '#1399a3', color: 'white' }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            label="Resources"
                            value="Resources"
                            icon={<LibraryBooksIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/resources"
                        />
                        <BottomNavigationAction
                            label="Journal"
                            value="Journal"
                            icon={<NoteAltIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/journal"
                        />
                        <BottomNavigationAction
                            label="Calendar"
                            value="Calendar"
                            icon={<CalendarMonthIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/calendar"
                        />
                    </BottomNavigation>
                </>
            )}
            {user.id && user.access_level === 'child' && (
                <>
                    <BottomNavigation
                        showLabels
                        sx={{ backgroundColor: '#1399a3', color: 'white' }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            label="Resources"
                            value="Resources"
                            icon={<LibraryBooksIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/resources"
                        />
                        <BottomNavigationAction
                            label="Journal"
                            value="Journal"
                            icon={<NoteAltIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/journal"
                        />
                        <BottomNavigationAction
                            label="Calendar"
                            value="Calendar"
                            icon={<CalendarMonthIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/calendar"
                        />
                        <BottomNavigationAction
                            label="Survey"
                            value="Survey"
                            icon={<BallotIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/survey"
                        />
                    </BottomNavigation>
                </>
            )} {user.id && user.access_level === 'admin' && (
                <>
                    <BottomNavigation
                        showLabels
                        sx={{ backgroundColor: '#1399a3', color: 'white' }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            label="Admin Home"
                            value="Calendar"
                            icon={<CalendarMonthIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/admin"
                        />
                        <BottomNavigationAction
                            label="Resources"
                            value="Resources"
                            icon={<LibraryBooksIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/resources"
                        />
                        <BottomNavigationAction
                            label="Survey"
                            value="Survey"
                            icon={<BallotIcon sx={{ color: 'white' }} />}
                            style={{ color: 'white' }}
                            component={Link}
                            to="/survey"
                        />
                    </BottomNavigation>
                </>
            )}
        </div>
    );
}

export default LabelBottomNavigation;