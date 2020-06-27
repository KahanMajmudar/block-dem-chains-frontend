export class GlobalConstants {
    public static BASE_URL = "http://localhost:3000";
    public static CONTRACT_URL = "http://localhost:3000/contract";
    public static TX_URL = "http://localhost:3000/tx";
    public static registerUserURL = GlobalConstants.BASE_URL + '/users/create';
    public static loginUserURL = GlobalConstants.BASE_URL + '/auth/login';
    public static addUserInfoURL = GlobalConstants.CONTRACT_URL + '/addUserInfo';
    public static viewUserInfoURL = GlobalConstants.CONTRACT_URL + '/viewUserInfo';
    public static addPostURL = GlobalConstants.CONTRACT_URL + '/addPost';
    public static getPostsURL = GlobalConstants.CONTRACT_URL + '/userPosts';
    public static viewTransactionsURL = GlobalConstants.TX_URL + '/viewTx';
    public static node;
    public static userName;
    public static nodeStatus;
    public static userDb;
    public static numOfUsersFollowed;
}