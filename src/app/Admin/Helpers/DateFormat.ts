import { formatDate } from '@angular/common';
export class FormatDate {
  public static format(date: any) {
    var variableDate = new Date(formatDate(new Date(date)
      .setDate(new Date(date).getDate() + 1), 'yyyy/MM/dd', 'en'))
      .toISOString().split('T')[0];
    return new Date(variableDate);
  }
}
