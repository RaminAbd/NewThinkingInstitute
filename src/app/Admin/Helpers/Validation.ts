import { ServiceResponse } from '../../Models/ServiceResponse.model';
import { MultiLingualItem } from '../../Models/MultiLingualItem.model';
import { MultiLingual } from '../../Models/MultiLingual.model';
export class Validation {
  private static finishValid = true;
  public static validateForm(form: any, type: string): ServiceResponse {
    var ErrorArray: any[] = [];
    var isValid: boolean = true;
    this.finishValid = true;
    var validateResponse: ServiceResponse = new ServiceResponse();
    isValid = this.validateMultiLingual(form.title, isValid)
    isValid = this.validateMultiLingual(form.description, isValid)
    if (!isValid) {
      this.finishValid = false;
      ErrorArray.push("Fill in all required fields ");
    }
    if (type === "news") {
      if ((form.videoURL === null || form.videoURL === undefined || form.videoURL === '') && (form.image === null || form.image === undefined)) {
        ErrorArray.push("Please add a video or image");
        this.finishValid = false;
      }
      else {
        // if ((form.videoURL !== '' && form.videoURL !== null) && (form.image !== null)) {
        //   ErrorArray.push("Delete a photo or video");
        //   this.finishValid = false;
        // }
      }
      if ((form.videoURL !== null || form.videoURL !== undefined || form.videoURL !== '') && (form.image === null || form.image === undefined)) {
        ErrorArray.push("Please add an image");
        this.finishValid = false;
      }
    }
    if (type === "blog") {
      if (form.image === null || form.image === undefined) {
        ErrorArray.push("Please add an image");
        this.finishValid = false;
      }
      if (form.author === null || form.author === undefined || form.author === '') {
        ErrorArray.push("Please Enter Author Name");
        this.finishValid = false;
      }
    }
    if (type === "projects") {
      if (form.image === null || form.image === undefined) {
        ErrorArray.push("Please add an image");
        this.finishValid = false;
      }
    }
    validateResponse.error = ErrorArray;
    validateResponse.succeeded = this.finishValid;
    return validateResponse;
  }

  private static validateMultiLingual(title: MultiLingual, isValid: boolean) {
    title.inputs.forEach((element: any) => {
      if (element.value === null || element.value === undefined || element.value === '') {
        isValid = false;
        element.borderColor = "#CC3D2B";
      }
      else {
        element.borderColor = "transparent"
      }
    });


    return isValid;
  }


}
