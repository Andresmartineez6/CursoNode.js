class RoleService{

    static hasRole(user,allowedRoles){
        return allowedRoles.include(user.role);
    }

}