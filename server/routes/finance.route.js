const FinanceController = require('../controllers/finance.controller');

module.exports = (app) => {
    app.get('/api/finances', FinanceController.findAllFinances)
    app.post('/api/finances', FinanceController.createNewFinance);
    app.get("/api/finances/user/", FinanceController. findFinancesBelongingToUser);
    app.get('/api/finances/:id', FinanceController.findOneSingleFinance);
    app.put('/api/finances/update/:id', FinanceController.updateExistingFinance);
    app.delete('/api/finances/delete/:id', FinanceController.deleteAnExistingFinance);
}
