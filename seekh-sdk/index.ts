import Controller from './src/controller';

const controller = new Controller();

controller.getAuth().login({ email: 'user4@email.com', password: 'Password@123' })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err)
    });

controller.getAuth().signup({ email: 'user4@email.com', password: 'Password@123', name: 'user4' })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err)
    });

export default Controller;