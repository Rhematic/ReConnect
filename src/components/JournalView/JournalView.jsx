import React, { useState, useEffect } from 'react';
import { Select, MenuItem, InputLabel, FormControl, Divider } from '@mui/material';
import axios from 'axios';
import './JournalView.css';
import { useSelector } from "react-redux";

const JournalView = () => {
    const [entries, setEntries] = useState([]);
    const [currentEntry, setCurrentEntry] = useState('');
    const [selectedPromptId, setSelectedPromptId] = useState('');
    const [entryDate, setEntryDate] = useState(new Date().toISOString().split('T')[0]);
    const [editingEntryId, setEditingEntryId] = useState(null);
    const user = useSelector((store) => store.user);
    const prompts = [
        { id: 1, detail: "What do I want to do to maintain the relationship with my parents?" },
        { id: 2, detail: "What is it about my parents that makes me proud?" },
        { id: 3, detail: "What is something important I want to tell my parents about this process?" },
        { id: 4, detail: "What are your fears?" },
        { id: 5, detail: "What are your strengths?" },
        { id: 6, detail: "Who are you thankful/grateful for today?" },
        { id: 7, detail: "Make a list of places you would like to visit..." },
        { id: 8, detail: "What is your favorite space of comfort in your mom’s house and your dad’s house?" },
        { id: 9, detail: "Make a list of the things that make you happy/smile..." },
        { id: 10, detail: "What’s one thing you would like to grow in the next year?" },
        { id: 11, detail: "What’s upsetting you more than normal this week?" },
        { id: 12, detail: "What do you need to remember in going back and forth from house to house?" },
        { id: 13, detail: "What emotions are you feeling the most and why?" },
        { id: 14, detail: "What were your highs and lows of last week?" },
        { id: 15, detail: "What do you love most about yourself?" },
        { id: 16, detail: "When you’re sad, what activities elevate your mood?" },
        { id: 17, detail: "What type of home environment do I want from my parents?" },
        { id: 18, detail: "Write a letter to your mom or dad. What are some of their traits you’re grateful for?" },
        { id: 19, detail: "What comes to mind first when you think of what makes you safe?" },
        { id: 20, detail: "What makes you feel inspired?" },
        { id: 21, detail: "Describe a person or support system that has had a significant positive impact on your mental health." },
        { id: 22, detail: "What is a hobby/activity that brings you joy." },
        { id: 23, detail: "Write about a time when you laughed uncontrollably." },
        { id: 24, detail: "What is your favorite thing to do in your freetime?" },
        { id: 25, detail: "Write about the most influential people in your life." },
        { id: 26, detail: "Who is someone you can always talk to?" },
        { id: 27, detail: "Write about one positive thing that happened today? How did it make you feel?" },
        { id: 28, detail: "What makes you feel calm?" },
        { id: 29, detail: "What makes you feel powerful?" },
        { id: 30, detail: "Who do you trust most and why?" }

    ];



    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = () => {
        axios.get('/api/journal')
            .then(response => {
                const formattedEntries = response.data.map(entry => ({
                    ...entry,
                    date: new Date(entry.date).toLocaleDateString()
                }));
                setEntries(formattedEntries);
            })
            .catch(error => console.error('Error fetching journal entries:', error));
    };
    const handleSelectChange = (event) => {
        setSelectedPromptId(event.target.value);
    };

    const saveEntry = () => {
        const entryData = {
            prompt_id: selectedPromptId,
            user_id: user.id,
            date: entryDate,
            detail: currentEntry,
        };

        const method = editingEntryId ? 'put' : 'post';
        const url = `/api/journal${editingEntryId ? `/${editingEntryId}` : ''}`;

        axios[method](url, entryData)
            .then(() => {
                fetchEntries();
                resetForm();
            })
            .catch(error => console.error('Error saving journal entry:', error));
    };

    const editEntry = (entry) => {
        setEditingEntryId(entry.id);
        setSelectedPromptId(entry.prompt_id);
        setCurrentEntry(entry.detail);
        setEntryDate(entry.date);
    };

    const deleteEntry = (id) => {
        axios.delete(`/api/journal/${id}`)
            .then(() => fetchEntries())
            .catch(error => console.error('Error deleting journal entry:', error));
    };

    const resetForm = () => {
        setEditingEntryId(null);
        setSelectedPromptId('');
        setCurrentEntry('');
        setEntryDate(new Date().toISOString().split('T')[0]);
    };

    const promptMap = prompts.reduce((map, prompt) => {
        map[prompt.id] = prompt.detail;
        return map;
    }, {});


    return (
        <div className="journal-view-container">
            <h1 className="journal-title">JOURNAL</h1>
            <input
                type="date"
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
            />
            <FormControl style={{ backgroundColor: 'white', marginBottom: '15px' }} fullWidth>
                <InputLabel id="promptDropdownLabel">Choose a prompt:</InputLabel>
                <Select
                    labelId="promptDropdownLabel"
                    id="promptDropdown"
                    value={selectedPromptId}
                    onChange={handleSelectChange}
                    style={{ maxWidth: '100%' }}

                >
                    <MenuItem value="">Choose a prompt...</MenuItem>
                    {prompts.map((prompt) => (
                        <MenuItem key={prompt.id} value={prompt.id} style={{ whiteSpace: 'normal', borderBottom: '1px solid #e0e0e0' }}>
                            {prompt.detail}

                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <textarea
                placeholder="Write your journal entry here..."
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
            />
            <button onClick={saveEntry}>
                {editingEntryId ? 'Update Entry' : 'Save Entry'}
            </button>
            <div>
                {entries.map(entry => (
                    <div key={entry.id} className="journal-entry">
                        <strong>Date:</strong> {entry.date}<br />
                        <strong>Prompt:</strong> {promptMap[entry.prompt_id]}<br />
                        <strong>Entry:</strong> {entry.detail}<br />
                        <button onClick={() => editEntry(entry)}>Edit</button>
                        <button onClick={() => deleteEntry(entry.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JournalView;

