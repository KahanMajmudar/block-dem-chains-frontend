export class GlobalConstants {
    public static BASE_URL = "http://localhost:3000";
    public static CONTRACT_URL = "http://localhost:3000/contract";
    public static registerUserURL = GlobalConstants.BASE_URL + '/users/create';
    public static loginUserURL = GlobalConstants.BASE_URL + '/auth/login';
    public static addUserInfoURL = GlobalConstants.CONTRACT_URL + '/addUserInfo';
    public static viewUserInfoURL = GlobalConstants.CONTRACT_URL + '/viewUserInfo';
    public static addPostURL = GlobalConstants.CONTRACT_URL + '/addPost';
    public static node;
    public static userName;
    public static nodeStatus;
    public static userDb;
    public static numOfUsersFollowed;
}