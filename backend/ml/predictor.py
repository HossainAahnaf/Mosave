import numpy as np


class SavingsPredictor:
    """Stub for a forecasting model using linear regression.

    Swap with Prophet, ARIMA, or a neural model depending on your roadmap.
    """

    def __init__(self) -> None:
        self.coefficients = np.array([0.6, -0.4, 0.2])

    def predict(self, income: float, expenses: float, savings: float) -> float:
        features = np.array([income, expenses, savings])
        return float(self.coefficients @ features / np.sum(self.coefficients))


predictor = SavingsPredictor()
