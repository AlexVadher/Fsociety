const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        // Verificar si el usuario está autenticado
        if (!req.user) {
            console.log('User is not authenticated.');
            return res.status(401).json({message: 'No estás autenticado.'});
        }

        // Convertir ambos roles a cadenas para asegurar la comparación correcta
        const userRole = String(req.user.idRol);
        const requiredRoleStr = String(requiredRole);

        if (userRole !== requiredRoleStr) {
            console.log(
                'User does not have the required role.',
                'User role:',
                userRole,
                'Required role:',
                requiredRoleStr,
            );
            return res
                .status(403)
                .json({message: 'No tienes permiso para acceder a esta ruta.'});
        }

        console.log('User has the required role:', userRole);
        next(); // Continuar con la siguiente función de middleware
    };
};

export default roleMiddleware;
