import { toast } from "react-toastify";
import { vi } from "vitest";
import { showSuccessMessage, showErrorMessage } from '../../src/utils/toast'; // Replace with the correct file path

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error:vi.fn(),
  },
}));

describe("showSuccessMessage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should call toast.success with the correct parameters", () => {
    const message = "Success message";
    const expectedOptions = {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    showSuccessMessage(message);

    expect(toast.success).toHaveBeenCalledWith(message, expectedOptions);
  });
});

describe("showErrormessage", () => {
    afterEach(() => {
      vi.clearAllMocks();
    });
  
    it("should call toast.error with the correct parameters", () => {
      const message = "error message";
      const expectedOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      };
  
      showErrorMessage(message);
  
      expect(toast.error).toHaveBeenCalledWith(message, expectedOptions);
    });
  });