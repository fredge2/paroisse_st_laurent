// Script principal pour le site de la Paroisse St Laurent-La Bresse

// Configuration globale
const CONFIG = {
    adminCode: '888888',
    images: [
        'images/croix_chretienne.jpg',
        'images/jesus_christ.jpg',
        'images/eglise_montagne.jpg'
    ],
    files: [
        {
            name: 'evangile_dimanche_1.txt',
            title: 'Évangile du 1er Dimanche de l\'Avent',
            description: 'Texte et réflexion sur l\'attente du Seigneur',
            date: '1er décembre 2024',
            icon: '📖'
        },
        {
            name: 'homelie_noel_2024.txt',
            title: 'Homélie de Noël 2024',
            description: 'Méditation sur la naissance du Christ',
            date: '25 décembre 2024',
            icon: '✨'
        }
    ]
};

// État de l'application
let isLoggedIn = false;
let currentFiles = [...CONFIG.files];
let currentImages = [...CONFIG.images];

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    initializeRandomImages();
    initializeEventListeners();
    loadStoredData();
    
    // Animation d'apparition pour les éléments
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease-out';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 100);
        }, index * 200);
    });
});

// Initialisation des images aléatoires
function initializeRandomImages() {
    const randomImageElements = document.querySelectorAll('#randomImage, #modalRandomImage');
    randomImageElements.forEach(element => {
        if (element) {
            displayRandomImage(element);
            // Changer l'image toutes les 30 secondes
            setInterval(() => displayRandomImage(element), 30000);
        }
    });
}

// Afficher une image aléatoire
function displayRandomImage(element) {
    if (currentImages.length > 0) {
        const randomIndex = Math.floor(Math.random() * currentImages.length);
        const imageSrc = currentImages[randomIndex];
        
        element.style.opacity = '0';
        setTimeout(() => {
            element.src = imageSrc;
            element.style.opacity = '1';
        }, 300);
    }
}

// Initialisation des écouteurs d'événements
function initializeEventListeners() {
    // Formulaire de connexion admin
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Gestion des modals
    window.addEventListener('click', function(event) {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
}

// Gestion de la connexion administrateur
function handleLogin(event) {
    event.preventDefault();
    const adminCode = document.getElementById('adminCode').value;
    const loginError = document.getElementById('loginError');
    
    if (adminCode === CONFIG.adminCode) {
        isLoggedIn = true;
        document.getElementById('loginScreen').classList.add('hidden');
        document.getElementById('adminPanel').classList.remove('hidden');
        loginError.classList.add('hidden');
        
        // Sauvegarder l'état de connexion (session)
        sessionStorage.setItem('adminLoggedIn', 'true');
    } else {
        loginError.classList.remove('hidden');
        document.getElementById('adminCode').value = '';
        
        // Animation d'erreur
        const loginScreen = document.getElementById('loginScreen');
        loginScreen.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            loginScreen.style.animation = '';
        }, 500);
    }
}

// Déconnexion
function logout() {
    isLoggedIn = false;
    document.getElementById('loginScreen').classList.remove('hidden');
    document.getElementById('adminPanel').classList.add('hidden');
    document.getElementById('adminCode').value = '';
    sessionStorage.removeItem('adminLoggedIn');
}

// Charger les données stockées
function loadStoredData() {
    // Vérifier si l'utilisateur était connecté
    if (sessionStorage.getItem('adminLoggedIn') === 'true') {
        isLoggedIn = true;
        if (document.getElementById('adminPanel')) {
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('adminPanel').classList.remove('hidden');
        }
    }
    
    // Charger les fichiers et images personnalisés depuis localStorage
    const storedFiles = localStorage.getItem('paroisse_files');
    if (storedFiles) {
        currentFiles = JSON.parse(storedFiles);
        updateFileList();
    }
    
    const storedImages = localStorage.getItem('paroisse_images');
    if (storedImages) {
        currentImages = JSON.parse(storedImages);
        updateImageCount();
    }
    
    const storedAdminCode = localStorage.getItem('paroisse_admin_code');
    if (storedAdminCode) {
        CONFIG.adminCode = storedAdminCode;
    }
}

// Rediriger vers la page de lecture dédiée
function viewFile(filename) {
    // Rediriger vers la page de lecture avec le nom du fichier en paramètre
    window.location.href = `lecture.html?file=${encodeURIComponent(filename)}`;
}

// Simuler le chargement du contenu d'un fichier
async function loadFileContent(filename) {
    // Dans un vrai site, ceci ferait un appel AJAX au serveur
    // Ici, nous simulons avec du contenu prédéfini
    const fileContents = {
        'evangile_dimanche_1.txt': `ÉVANGILE DU PREMIER DIMANCHE DE L'AVENT

Lecture de l'Évangile selon saint Matthieu (24, 37-44)

En ce temps-là, Jésus disait à ses disciples :
« Comme il en fut aux jours de Noé, ainsi en sera-t-il lors de la venue du Fils de l'homme.
En ces jours-là, avant le déluge, on mangeait et on buvait, on prenait femme et on prenait mari, jusqu'au jour où Noé entra dans l'arche ; les gens ne se sont doutés de rien, jusqu'à ce que survienne le déluge qui les a tous engloutis : ainsi en sera-t-il lors de la venue du Fils de l'homme.

Alors deux hommes seront aux champs : l'un sera pris, l'autre laissé. Deux femmes seront au moulin en train de moudre : l'une sera prise, l'autre laissée.

Veillez donc, car vous ne savez pas quel jour votre Seigneur vient. Comprenez-le bien : si le maître de maison avait su à quelle heure de la nuit le voleur viendrait, il aurait veillé et n'aurait pas laissé percer le mur de sa maison.

Tenez-vous donc prêts, vous aussi : c'est à l'heure où vous n'y penserez pas que le Fils de l'homme viendra. »

RÉFLEXION

L'Avent nous invite à la vigilance et à l'attente. Dans ce passage, Jésus nous rappelle que sa venue peut survenir à tout moment. Cette attente n'est pas passive, mais active : elle nous appelle à vivre chaque jour dans la préparation de nos cœurs.

La vigilance chrétienne n'est pas de l'anxiété, mais une disposition intérieure qui nous maintient dans l'espérance. Comme les vierges sages de la parabole, nous devons garder nos lampes allumées, c'est-à-dire cultiver notre foi, notre charité et notre espérance.

En ce temps de l'Avent, préparons-nous à accueillir le Christ qui vient. Il vient dans notre histoire personnelle, dans nos joies et nos peines, dans nos rencontres quotidiennes. Soyons attentifs à sa présence discrète mais réelle.

Que cette période nous aide à purifier nos cœurs et à nous tourner vers l'essentiel : l'amour de Dieu et du prochain.

Amen.`,
        
        'homelie_noel_2024.txt': `HOMÉLIE DE NOËL 2024

"Et le Verbe s'est fait chair, il a habité parmi nous"

Chers frères et sœurs,

En cette nuit sainte, nous célébrons le mystère de l'Incarnation. Dieu se fait homme, l'Éternel entre dans le temps, l'Infini se fait petit enfant. Quel bouleversement ! Quelle révolution dans l'histoire de l'humanité !

LA CRÈCHE, ÉCOLE DE SIMPLICITÉ

Regardons la crèche : une étable, de la paille, des bergers, des animaux. Rien de grandiose selon les critères du monde. Pourtant, c'est là que Dieu choisit de naître. Il nous enseigne ainsi que la vraie grandeur ne se trouve pas dans l'éclat extérieur, mais dans l'humilité et l'amour.

Marie et Joseph nous montrent l'accueil confiant à la volonté de Dieu. Malgré les difficultés, ils disent "oui" au projet divin. Leur foi nous inspire : sachons nous aussi faire confiance à Dieu, même quand nous ne comprenons pas tout.

L'ENFANT JÉSUS, LUMIÈRE DU MONDE

Jésus naît dans la nuit, mais il est la Lumière qui éclaire toute l'humanité. Cette lumière brille encore aujourd'hui pour chacun de nous. Elle éclaire nos doutes, nos peurs, nos souffrances. Elle nous révèle que nous sommes aimés de Dieu d'un amour infini.

En cette période parfois difficile pour notre monde, où les conflits et les divisions semblent l'emporter, la naissance de Jésus nous rappelle que l'amour est plus fort que la haine, que la paix est possible, que l'espérance n'est jamais vaine.

DEVENIR TÉMOINS DE LA JOIE

Comme les bergers qui ont couru annoncer la Bonne Nouvelle, nous sommes appelés à être des témoins de la joie de Noël. Cette joie ne vient pas des cadeaux ou des festivités, aussi belles soient-elles, mais de la certitude que Dieu nous aime et qu'il est avec nous.

Portons cette joie autour de nous : dans nos familles, auprès de ceux qui souffrent, vers ceux qui se sentent seuls. Soyons des "porteurs de lumière" dans notre monde.

PRIÈRE

Seigneur Jésus, toi qui as voulu naître dans la simplicité d'une crèche, viens naître aussi dans nos cœurs. Aide-nous à t'accueillir avec la foi de Marie, la générosité de Joseph, la joie des bergers.

Que ta paix règne dans nos familles, dans notre paroisse, dans notre monde. Que ta lumière guide nos pas sur le chemin de la vie.

Joyeux Noël à tous !

Père Jean-Marie Dubois
Paroisse St Laurent - La Bresse`
    };
    
    return fileContents[filename] || 'Contenu du fichier non disponible.';
}

// Fermer la modal de fichier
function closeModal() {
    const modal = document.getElementById('fileModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Fermer la modal de message
function closeMessageModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Afficher un message dans une modal
function showMessage(message, type = 'info') {
    const modal = document.getElementById('messageModal');
    const messageDiv = document.getElementById('modalMessage');
    
    if (modal && messageDiv) {
        const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        const color = type === 'success' ? 'var(--secondary-color)' : type === 'error' ? '#DC3545' : 'var(--accent-color)';
        
        messageDiv.innerHTML = `
            <div style="text-align: center; padding: 1rem;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">${icon}</div>
                <h3 style="color: ${color}; margin-bottom: 1rem;">
                    ${type === 'success' ? 'Succès' : type === 'error' ? 'Erreur' : 'Information'}
                </h3>
                <p>${message}</p>
                <button onclick="closeMessageModal()" class="btn" style="margin-top: 1rem;">OK</button>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

// Fonctions d'administration

// Télécharger un fichier
function uploadFile() {
    if (!isLoggedIn) return;
    
    const title = document.getElementById('fileTitle').value;
    const description = document.getElementById('fileDescription').value;
    const fileInput = document.getElementById('fileUpload');
    
    if (!title || !description || !fileInput.files[0]) {
        showMessage('Veuillez remplir tous les champs et sélectionner un fichier.', 'error');
        return;
    }
    
    const file = fileInput.files[0];
    const filename = file.name;
    const date = new Date().toLocaleDateString('fr-FR');
    
    // Simuler l'upload (dans un vrai site, ceci enverrait le fichier au serveur)
    const newFile = {
        name: filename,
        title: title,
        description: description,
        date: date,
        icon: filename.toLowerCase().includes('evangile') ? '📖' : '✨'
    };
    
    currentFiles.push(newFile);
    localStorage.setItem('paroisse_files', JSON.stringify(currentFiles));
    
    updateFileList();
    updateExistingFilesList();
    
    // Réinitialiser le formulaire
    document.getElementById('fileTitle').value = '';
    document.getElementById('fileDescription').value = '';
    document.getElementById('fileUpload').value = '';
    
    showMessage('Fichier ajouté avec succès !', 'success');
}

// Télécharger une image
function uploadImage() {
    if (!isLoggedIn) return;
    
    const imageInput = document.getElementById('imageUpload');
    
    if (!imageInput.files[0]) {
        showMessage('Veuillez sélectionner une image.', 'error');
        return;
    }
    
    const file = imageInput.files[0];
    
    // Simuler l'upload d'image (dans un vrai site, ceci enverrait l'image au serveur)
    // Pour la simulation, nous ajoutons juste un placeholder
    const newImagePath = `images/uploaded_${Date.now()}.jpg`;
    currentImages.push(newImagePath);
    localStorage.setItem('paroisse_images', JSON.stringify(currentImages));
    
    updateImageCount();
    
    // Réinitialiser le formulaire
    document.getElementById('imageUpload').value = '';
    
    showMessage('Image ajoutée avec succès !', 'success');
}

// Créer une nouvelle page
function createPage() {
    if (!isLoggedIn) return;
    
    const title = document.getElementById('pageTitle').value;
    const content = document.getElementById('pageContent').value;
    
    if (!title || !content) {
        showMessage('Veuillez remplir le titre et le contenu de la page.', 'error');
        return;
    }
    
    // Simuler la création de page (dans un vrai site, ceci créerait un nouveau fichier HTML)
    showMessage(`Page "${title}" créée avec succès ! (Fonctionnalité simulée)`, 'success');
    
    // Réinitialiser le formulaire
    document.getElementById('pageTitle').value = '';
    document.getElementById('pageContent').value = '';
}

// Changer le code administrateur
function changeAdminCode() {
    if (!isLoggedIn) return;
    
    const newCode = document.getElementById('newAdminCode').value;
    const confirmCode = document.getElementById('confirmAdminCode').value;
    
    if (!newCode || !confirmCode) {
        showMessage('Veuillez remplir les deux champs.', 'error');
        return;
    }
    
    if (newCode !== confirmCode) {
        showMessage('Les codes ne correspondent pas.', 'error');
        return;
    }
    
    if (newCode.length < 6) {
        showMessage('Le code doit contenir au moins 6 caractères.', 'error');
        return;
    }
    
    CONFIG.adminCode = newCode;
    localStorage.setItem('paroisse_admin_code', newCode);
    
    // Réinitialiser le formulaire
    document.getElementById('newAdminCode').value = '';
    document.getElementById('confirmAdminCode').value = '';
    
    showMessage('Code administrateur modifié avec succès !', 'success');
}

// Modifier un fichier
function editFile(filename) {
    if (!isLoggedIn) return;
    showMessage(`Édition du fichier "${filename}" (Fonctionnalité à implémenter)`, 'info');
}

// Supprimer un fichier
function deleteFile(filename) {
    if (!isLoggedIn) return;
    
    if (confirm(`Êtes-vous sûr de vouloir supprimer le fichier "${filename}" ?`)) {
        currentFiles = currentFiles.filter(f => f.name !== filename);
        localStorage.setItem('paroisse_files', JSON.stringify(currentFiles));
        
        updateFileList();
        updateExistingFilesList();
        
        showMessage('Fichier supprimé avec succès !', 'success');
    }
}

// Mettre à jour la liste des fichiers sur la page évangiles
function updateFileList() {
    const fileList = document.getElementById('fileList');
    if (!fileList) return;
    
    fileList.innerHTML = '';
    
    currentFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.onclick = () => viewFile(file.name);
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${file.icon}</div>
                <div>
                    <h4>${file.title}</h4>
                    <p>${file.description}</p>
                    <small>Ajouté le ${file.date}</small>
                </div>
            </div>
            <button class="btn btn-secondary">Lire</button>
        `;
        
        fileList.appendChild(fileItem);
    });
}

// Mettre à jour la liste des fichiers existants dans l'admin
function updateExistingFilesList() {
    const existingFiles = document.getElementById('existingFiles');
    if (!existingFiles) return;
    
    existingFiles.innerHTML = '';
    
    currentFiles.forEach(file => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        
        fileItem.innerHTML = `
            <div class="file-info">
                <div class="file-icon">${file.icon}</div>
                <div>
                    <h4>${file.title}</h4>
                    <p>${file.name}</p>
                    <small>Ajouté le ${file.date}</small>
                </div>
            </div>
            <div class="flex gap-1">
                <button class="btn btn-secondary" onclick="editFile('${file.name}')">
                    Modifier
                </button>
                <button class="btn btn-danger" onclick="deleteFile('${file.name}')">
                    Supprimer
                </button>
            </div>
        `;
        
        existingFiles.appendChild(fileItem);
    });
}

// Mettre à jour le compteur d'images
function updateImageCount() {
    const imageCount = document.getElementById('imageCount');
    if (imageCount) {
        imageCount.textContent = currentImages.length;
    }
}

// Animation de shake pour les erreurs
const shakeKeyframes = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
    20%, 40%, 60%, 80% { transform: translateX(5px); }
}
`;

// Ajouter les keyframes au document
const style = document.createElement('style');
style.textContent = shakeKeyframes;
document.head.appendChild(style);


// Variables globales pour la gestion des suppressions
let deleteTarget = null;
let deleteType = null;

// Gestion des images spirituelles
const spiritualImages = [
    { name: 'croix_chretienne.jpg', title: 'Croix chrétienne dorée' },
    { name: 'jesus_christ.jpg', title: 'Portrait de Jésus Christ' },
    { name: 'eglise_montagne.jpg', title: 'Église dans les montagnes' }
];

// Gestion des pages créées
const customPages = [
    { name: 'activites.html', title: 'Activités Paroissiales' },
    { name: 'horaires.html', title: 'Horaires des Messes' }
];

// Afficher la liste des images pour gestion
function showImageList() {
    const modal = document.getElementById('imageManagementModal');
    const imageList = document.getElementById('imageList');
    
    let html = '<div class="management-list">';
    
    spiritualImages.forEach((image, index) => {
        html += `
            <div class="management-item">
                <div class="item-info">
                    <img src="../images/${image.name}" alt="${image.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">
                    <div style="margin-left: 1rem;">
                        <h4>${image.title}</h4>
                        <p style="color: #666; font-size: 0.9rem;">${image.name}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-danger btn-sm" onclick="requestDeleteImage(${index})">
                        🗑️ Supprimer
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    if (spiritualImages.length === 0) {
        html = '<p style="text-align: center; color: #666;">Aucune image disponible</p>';
    }
    
    imageList.innerHTML = html;
    modal.style.display = 'block';
}

// Afficher la liste des pages pour gestion
function showPageList() {
    const modal = document.getElementById('pageManagementModal');
    const pageList = document.getElementById('pageList');
    
    let html = '<div class="management-list">';
    
    customPages.forEach((page, index) => {
        html += `
            <div class="management-item">
                <div class="item-info">
                    <div class="file-icon">📄</div>
                    <div style="margin-left: 1rem;">
                        <h4>${page.title}</h4>
                        <p style="color: #666; font-size: 0.9rem;">${page.name}</p>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn btn-secondary btn-sm" onclick="editPage(${index})" style="margin-right: 0.5rem;">
                        ✏️ Modifier
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="requestDeletePage(${index})">
                        🗑️ Supprimer
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    if (customPages.length === 0) {
        html = '<p style="text-align: center; color: #666;">Aucune page personnalisée créée</p>';
    }
    
    pageList.innerHTML = html;
    modal.style.display = 'block';
}

// Demander confirmation de suppression d'une image
function requestDeleteImage(index) {
    const image = spiritualImages[index];
    deleteTarget = index;
    deleteType = 'image';
    
    document.getElementById('deleteConfirmMessage').textContent = 
        `Êtes-vous sûr de vouloir supprimer l'image "${image.title}" ?`;
    document.getElementById('confirmDeleteModal').style.display = 'block';
}

// Demander confirmation de suppression d'une page
function requestDeletePage(index) {
    const page = customPages[index];
    deleteTarget = index;
    deleteType = 'page';
    
    document.getElementById('deleteConfirmMessage').textContent = 
        `Êtes-vous sûr de vouloir supprimer la page "${page.title}" ?`;
    document.getElementById('confirmDeleteModal').style.display = 'block';
}

// Demander confirmation de suppression d'un fichier
function deleteFile(filename) {
    const file = currentFiles.find(f => f.name === filename);
    if (!file) return;
    
    deleteTarget = filename;
    deleteType = 'file';
    
    document.getElementById('deleteConfirmMessage').textContent = 
        `Êtes-vous sûr de vouloir supprimer le fichier "${file.title}" ?`;
    document.getElementById('confirmDeleteModal').style.display = 'block';
}

// Confirmer la suppression
function confirmDelete() {
    if (deleteType === 'image' && deleteTarget !== null) {
        // Supprimer l'image
        const deletedImage = spiritualImages.splice(deleteTarget, 1)[0];
        updateImageCount();
        showMessage(`Image "${deletedImage.title}" supprimée avec succès`, 'success');
        showImageList(); // Rafraîchir la liste
        
    } else if (deleteType === 'page' && deleteTarget !== null) {
        // Supprimer la page
        const deletedPage = customPages.splice(deleteTarget, 1)[0];
        showMessage(`Page "${deletedPage.title}" supprimée avec succès`, 'success');
        showPageList(); // Rafraîchir la liste
        
    } else if (deleteType === 'file' && deleteTarget !== null) {
        // Supprimer le fichier
        const fileIndex = currentFiles.findIndex(f => f.name === deleteTarget);
        if (fileIndex !== -1) {
            const deletedFile = currentFiles.splice(fileIndex, 1)[0];
            updateFilesList();
            showMessage(`Fichier "${deletedFile.title}" supprimé avec succès`, 'success');
        }
    }
    
    closeConfirmDeleteModal();
}

// Modifier une page existante
function editPage(index) {
    const page = customPages[index];
    document.getElementById('pageTitle').value = page.title;
    document.getElementById('pageContent').value = `<h1>${page.title}</h1>\n<p>Contenu de la page...</p>`;
    closePageManagementModal();
    showMessage(`Page "${page.title}" chargée pour modification`, 'info');
}

// Modifier un fichier existant
function editFile(filename) {
    const file = currentFiles.find(f => f.name === filename);
    if (!file) return;
    
    document.getElementById('fileTitle').value = file.title;
    document.getElementById('fileDescription').value = file.description;
    showMessage(`Fichier "${file.title}" chargé pour modification`, 'info');
}

// Mettre à jour le compteur d'images
function updateImageCount() {
    const countElement = document.getElementById('imageCount');
    if (countElement) {
        countElement.textContent = spiritualImages.length;
    }
}

// Fermer les modals
function closeImageManagementModal() {
    document.getElementById('imageManagementModal').style.display = 'none';
}

function closePageManagementModal() {
    document.getElementById('pageManagementModal').style.display = 'none';
}

function closeConfirmDeleteModal() {
    document.getElementById('confirmDeleteModal').style.display = 'none';
    deleteTarget = null;
    deleteType = null;
}

// Ajouter les styles CSS pour les nouvelles fonctionnalités
const additionalStyles = `
    .management-list {
        max-height: 400px;
        overflow-y: auto;
    }
    
    .management-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border: 1px solid #ddd;
        border-radius: 8px;
        margin-bottom: 1rem;
        background: #f9f9f9;
    }
    
    .item-info {
        display: flex;
        align-items: center;
        flex: 1;
    }
    
    .item-actions {
        display: flex;
        gap: 0.5rem;
    }
    
    .btn-sm {
        padding: 0.4rem 0.8rem;
        font-size: 0.85rem;
    }
    
    .btn-danger {
        background: #dc3545;
        color: white;
        border: none;
    }
    
    .btn-danger:hover {
        background: #c82333;
    }
    
    .btn-secondary {
        background: #6c757d;
        color: white;
        border: none;
    }
    
    .btn-secondary:hover {
        background: #5a6268;
    }
    
    .file-icon {
        font-size: 2rem;
        margin-right: 1rem;
    }
`;

// Ajouter les styles au document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialiser le compteur d'images au chargement
document.addEventListener('DOMContentLoaded', function() {
    updateImageCount();
});


// Afficher la liste des fichiers pour gestion
function showFileList() {
    const modal = document.getElementById('fileManagementModal');
    const fileList = document.getElementById('fileManagementList');
    
    let html = '<div class="management-list">';
    
    currentFiles.forEach((file, index) => {
        const icon = file.name.includes('evangile') ? '📖' : '✨';
        html += `
            <div class="management-item">
                <div class="item-info">
                    <div class="file-icon">${icon}</div>
                    <div style="margin-left: 1rem;">
                        <h4>${file.title}</h4>
                        <p style="color: #666; font-size: 0.9rem;">${file.name}</p>
                        <small style="color: #999;">Ajouté le ${file.date}</small>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="btn-edit" onclick="editFileFromList('${file.name}')" style="margin-right: 0.5rem;">
                        ✏️ Modifier
                    </button>
                    <button class="btn-delete" onclick="requestDeleteFileFromList('${file.name}')">
                        🗑️ Supprimer
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    
    if (currentFiles.length === 0) {
        html = '<p style="text-align: center; color: #666;">Aucun fichier disponible</p>';
    }
    
    fileList.innerHTML = html;
    modal.style.display = 'block';
}

// Modifier un fichier depuis la liste de gestion
function editFileFromList(filename) {
    const file = currentFiles.find(f => f.name === filename);
    if (!file) return;
    
    document.getElementById('fileTitle').value = file.title;
    document.getElementById('fileDescription').value = file.description;
    closeFileManagementModal();
    showMessage(`Fichier "${file.title}" chargé pour modification`, 'info');
}

// Demander confirmation de suppression d'un fichier depuis la liste de gestion
function requestDeleteFileFromList(filename) {
    const file = currentFiles.find(f => f.name === filename);
    if (!file) return;
    
    deleteTarget = filename;
    deleteType = 'file';
    
    document.getElementById('deleteConfirmMessage').textContent = 
        `Êtes-vous sûr de vouloir supprimer le fichier "${file.title}" ?`;
    document.getElementById('confirmDeleteModal').style.display = 'block';
    
    // Fermer la modal de gestion des fichiers
    closeFileManagementModal();
}

// Fermer la modal de gestion des fichiers
function closeFileManagementModal() {
    document.getElementById('fileManagementModal').style.display = 'none';
}

// Mettre à jour la fonction confirmDelete pour gérer la suppression depuis la liste
function confirmDeleteUpdated() {
    if (deleteType === 'image' && deleteTarget !== null) {
        // Supprimer l'image
        const deletedImage = spiritualImages.splice(deleteTarget, 1)[0];
        updateImageCount();
        showMessage(`Image "${deletedImage.title}" supprimée avec succès`, 'success');
        
        // Rafraîchir la liste si la modal est ouverte
        const imageModal = document.getElementById('imageManagementModal');
        if (imageModal.style.display === 'block') {
            showImageList();
        }
        
    } else if (deleteType === 'page' && deleteTarget !== null) {
        // Supprimer la page
        const deletedPage = customPages.splice(deleteTarget, 1)[0];
        showMessage(`Page "${deletedPage.title}" supprimée avec succès`, 'success');
        
        // Rafraîchir la liste si la modal est ouverte
        const pageModal = document.getElementById('pageManagementModal');
        if (pageModal.style.display === 'block') {
            showPageList();
        }
        
    } else if (deleteType === 'file' && deleteTarget !== null) {
        // Supprimer le fichier
        const fileIndex = currentFiles.findIndex(f => f.name === deleteTarget);
        if (fileIndex !== -1) {
            const deletedFile = currentFiles.splice(fileIndex, 1)[0];
            updateFilesList();
            showMessage(`Fichier "${deletedFile.title}" supprimé avec succès`, 'success');
            
            // Rafraîchir la liste si la modal est ouverte
            const fileModal = document.getElementById('fileManagementModal');
            if (fileModal.style.display === 'block') {
                showFileList();
            }
        }
    }
    
    closeConfirmDeleteModal();
}

// Remplacer la fonction confirmDelete existante
window.confirmDelete = confirmDeleteUpdated;

