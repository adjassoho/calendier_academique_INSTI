import axios from 'axios';

const eventService = {
    getAll: async () => {
        const response = await axios.get('/api/v1/evenements');
        return response.data;
    },

    create: async (eventData) => {
        console.log('Données reçues:', eventData);
        
        // Formater les données pour correspondre à ce que le backend attend
        const formattedData = {
            title: eventData.title,
            description: eventData.description || '',
            date: eventData.date instanceof Date 
                ? eventData.date.toISOString().split('T')[0] 
                : eventData.date,
            event_type: eventData.type,        // Reçu comme 'type'
            status: eventData.status,
            study_levels: Array.isArray(eventData.studyLevels) 
                ? eventData.studyLevels 
                : [],
        };

        // Ajouter les champs optionnels seulement s'ils existent
        if (eventData.location) formattedData.location = eventData.location;
        if (typeof eventData.is_online === 'boolean') formattedData.is_online = eventData.is_online;
        if (eventData.meeting_link) formattedData.meeting_link = eventData.meeting_link;

        console.log('Données formatées pour l\'API:', formattedData);
        
        try {
            const response = await axios.post('/api/v1/evenements', formattedData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            console.log('Réponse de l\'API:', response.data);
            return response.data;
        } catch (error) {
            console.error('Erreur détaillée:', {
                response: error.response?.data,
                data: formattedData
            });
            throw new Error(error.response?.data?.message || 'Erreur lors de la création de l\'événement');
        }
    },

    update: async (id, eventData) => {
        const formattedData = {
            title: eventData.title,
            description: eventData.description || '',
            date: eventData.date instanceof Date 
                ? eventData.date.toISOString().split('T')[0] 
                : eventData.date,
            event_type: eventData.type,
            status: eventData.status,
            study_levels: Array.isArray(eventData.studyLevels) 
                ? eventData.studyLevels 
                : []
        };

        if (eventData.location) formattedData.location = eventData.location;
        if (typeof eventData.is_online === 'boolean') formattedData.is_online = eventData.is_online;
        if (eventData.meeting_link) formattedData.meeting_link = eventData.meeting_link;

        const response = await axios.put(`/api/v1/evenements/${id}`, formattedData);
        return response.data;
    },

    delete: async (id) => {
        await axios.delete(`/api/v1/evenements/${id}`);
    }
};

export default eventService;
