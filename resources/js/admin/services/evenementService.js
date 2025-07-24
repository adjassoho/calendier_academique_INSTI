const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/evenements';

// Configuration par défaut pour fetch
const defaultHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
};

// Fonction pour gérer les réponses
const handleResponse = async (response) => {
    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok) {
        console.error('Réponse d\'erreur:', response); // Log de la réponse brute
        if (response.status === 422 && data?.errors) {
            // Gestion des erreurs de validation (422)
            const messages = Object.values(data.errors).flat();
            throw new Error(messages.join('\n'));
        }
        // Autres types d'erreurs
        throw new Error(data?.message || `Erreur ${response.status}`);
    }

    return data;
};

export const evenementService = {
    // Récupérer tous les événements
    getAll: async () => {
        try {
            console.log('Récupération des événements...');
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: defaultHeaders,
                credentials: 'include'
            });

            const data = await handleResponse(response);
            console.log('Événements reçus:', data);
            return data;
        } catch (error) {
            console.error('Erreur getAll:', error);
            throw error;
        }
    },

    // Créer un nouvel événement
    create: async (evenement) => {
        try {
            console.log('Tentative de création avec les données:', evenement);

            // Vérification des champs obligatoires
            if (!evenement.event_type || !evenement.study_levels) {
                throw new Error('Les champs "event_type" et "study_levels" sont obligatoires.');
            }

            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: defaultHeaders,
                credentials: 'include',
                body: JSON.stringify(evenement)
            });

            const data = await handleResponse(response);
            console.log('Événement créé avec succès:', data);
            return data;
        } catch (error) {
            console.error('Erreur create:', error);
            throw error;
        }
    },

    // Mettre à jour un événement
    update: async (id, evenement) => {
        try {
            console.log('Tentative de mise à jour avec les données:', evenement);

            // Vérification des champs obligatoires
            if (!evenement.event_type || !evenement.study_levels) {
                throw new Error('Les champs "event_type" et "study_levels" sont obligatoires.');
            }

            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: defaultHeaders,
                credentials: 'include',
                body: JSON.stringify(evenement)
            });

            const data = await handleResponse(response);
            console.log('Événement mis à jour avec succès:', data);
            return data;
        } catch (error) {
            console.error('Erreur update:', error);
            throw error;
        }
    },

    // Supprimer un événement
    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
                headers: defaultHeaders,
                credentials: 'include'
            });

            await handleResponse(response);
            console.log('Événement supprimé avec succès:', id);
        } catch (error) {
            console.error('Erreur delete:', error);
            throw error;
        }
    }
};