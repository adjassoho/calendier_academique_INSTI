const API_BASE_URL = 'http://localhost:8000/api/v1';

const getCsrfToken = () => {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
};

// Configuration par défaut pour fetch
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'X-CSRF-TOKEN': getCsrfToken()
};

// Fonction pour gérer les réponses
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    
    // Log de la réponse brute
    const responseText = await response.text();
    console.log('Réponse brute du serveur:', responseText);

    let data;
    try {
        data = isJson ? JSON.parse(responseText) : null;
    } catch (e) {
        console.error('Erreur de parsing JSON:', e);
        throw new Error(`Réponse invalide du serveur: ${responseText}`);
    }

    if (!response.ok) {
        // Log détaillé de l'erreur
        console.error('Détails de la réponse:', {
            status: response.status,
            statusText: response.statusText,
            headers: Object.fromEntries(response.headers.entries()),
            data: data
        });

        // Gestion spécifique des erreurs de validation (422)
        if (response.status === 422 && data?.errors) {
            const messages = Object.values(data.errors).flat();
            throw new Error(messages.join('\n'));
        }

        // Autres types d'erreurs
        throw new Error(data?.message || `Erreur ${response.status}: ${responseText}`);
    }

    return data;
};

const eventService = {
    getAll: async () => {
        try {
            console.log('Récupération des événements...');
            const response = await fetch(`${API_BASE_URL}/evenements`, {
                method: 'GET',
                headers: defaultHeaders,
                credentials: 'include'
            });
            
            const data = await handleResponse(response);
            console.log('Événements reçus:', data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la récupération des événements:', error);
            throw error;
        }
    },

    create: async (eventData) => {
        try {
            // Formatage de la date au format attendu par le serveur
            const formattedData = {
                title: eventData.title,
                date: eventData.date.toISOString().split('T')[0], // Format YYYY-MM-DD
                event_type: eventData.type,      // Assurez-vous que cette valeur est l'une des valeurs autorisées
                status: eventData.status,        // Assurez-vous que cette valeur est l'une des valeurs autorisées
                description: eventData.description,
                study_levels: eventData.studyLevels // Assurez-vous que ces valeurs sont parmi celles autorisées
            };

            console.log('Données formatées envoyées au serveur:', formattedData);
            
            const response = await fetch(`${API_BASE_URL}/evenements`, {
                method: 'POST',
                headers: defaultHeaders,
                credentials: 'include',
                body: JSON.stringify(formattedData)
            });

            return await handleResponse(response);
        } catch (error) {
            console.error('Erreur détaillée lors de la création:', error);
            throw error;
        }
    },

    update: async (id, eventData) => {
        try {
            console.log('Tentative de mise à jour avec les données:', eventData);
            const response = await fetch(`${API_BASE_URL}/evenements/${id}`, {
                method: 'PUT',
                headers: defaultHeaders,
                credentials: 'include',
                body: JSON.stringify(eventData)
            });

            const data = await handleResponse(response);
            console.log('Événement mis à jour avec succès:', data);
            return data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
            throw error;
        }
    },

    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/evenements/${id}`, {
                method: 'DELETE',
                headers: defaultHeaders,
                credentials: 'include'
            });

            await handleResponse(response);
            console.log('Événement supprimé avec succès:', id);
        } catch (error) {
            console.error('Erreur lors de la suppression:', error);
            throw error;
        }
    }
};

export default eventService;
