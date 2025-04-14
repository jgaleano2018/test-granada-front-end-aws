export class LogCountriesClass {
    id: number;
    username: string;
    request_timestamp: string;
    num_countries_returned: number;
    countries_details: string;
    created_date: Date;

    constructor(id: number, username: string, request_timestamp: string, num_countries_returned: number, countries_details: string, created_date: Date) {
        this.id = id;
        this.username = username;
        this.request_timestamp = request_timestamp;
        this.num_countries_returned = num_countries_returned;
        this.countries_details = countries_details;
        this.created_date = created_date;
    }

}