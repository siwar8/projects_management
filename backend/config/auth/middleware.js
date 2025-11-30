const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    try {
        // Extraire et vérifier le token depuis l'en-tête Authorization
        console.log(req.headers);
        const decoded = await jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.SECRET_KEY
        );

        // Ajouter les informations de l'utilisateur décodé à la requête
        req.user = decoded;

        // Vérification si l'utilisateur est admin pour les actions sensibles (comme delete)
        if (req.method === 'DELETE') {
            if (req.user.role !== 'admin') {
                return res.status(403).send({ message: "Accès refusé : droits insuffisants" });
            }
        }

        // Si tout est valide, passer au middleware ou au contrôleur suivant
        next();

    } catch (error) {
        res.status(401).send('invalid token'); // Renvoie une erreur si le token est invalide
    }
};

module.exports = { verifyToken };
