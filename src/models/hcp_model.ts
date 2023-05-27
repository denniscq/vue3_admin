/**
 * @description defined class for hcp model.
 */

export class hcp {
    constructor(id: number, name: string, medical: string, priority: number, hospitalName: string, scheduleList: Array<schedule>) {
        this.id = id;
        this.name = name;
        this.medical = medical
        this.priority = priority;
        this.hospitalName = hospitalName
        this.scheduleList = scheduleList
    }

    public id: number;
    public name: string;
    public medical: string;
    public priority: number;
    public hospitalName: string;
    public scheduleList: Array<schedule>
}

/**
 * @description defined class for schedule information.
 */
export class schedule {
    constructor(category: string, scheduleTime: string, confirmedTime: string, owner: string) {
        this.category = category;
        this.scheduleTime = scheduleTime;
        this.confirmedTime = confirmedTime;
        this.owner = owner;
    }
    public category: string;
    public scheduleTime: string
    public confirmedTime: string
    public owner: string
}

export function init_mockData(): hcp[] {
    const result: Array<hcp> = []

    // mock data 1
    const scheduleList1 = [
        new schedule('mail', '04/02/2023 09:00:00', '04/02/2023 18:00:00', '1'),
        new schedule('computer', '04/10/2023 09:00:00', '04/12/2023 18:00:00', '0'),
        new schedule('mail', '05/02/2023 09:00:00', '05/02/2023 18:00:00', '1'),
        new schedule('people', '05/03/2023 09:00:00', '05/08/2023 09:00:00', '1'),
        new schedule('phone', '05/04/2023 16:00:00', '05/11/2023 18:00:00', '1'),
        new schedule('mail', '05/08/2023 09:00:00', '05/12/2023 13:00:00', '1'),
        new schedule('computer', '05/09/2023 12:00:00', '05/15/2023 18:00:00', '0'),
        new schedule('mail', '05/10/2023 08:00:00', '05/28/2023 23:00:00', '1'),
        new schedule('people', '05/11/2023 03:00:00', '05/22/2023 18:00:00', '1'),
        new schedule('mail', '05/15/2023 09:00:00', '05/23/2023 10:00:00', '0'),
        new schedule('people', '05/16/2023 06:00:00', '06/01/2023 10:00:00', '1'),
        new schedule('computer', '05/13/2023 09:00:00', '06/02/2023 10:00:00', '1'),
        new schedule('people', '05/22/2023 22:00:00', '06/4/2023 14:00:00', '1'),
        new schedule('computer', '05/23/2023 19:00:00', '06/08/2023 10:00:00', '1'),
        new schedule('people', '05/24/2023 09:00:00', '06/03/2023 15:00:00', '0'),
        new schedule('phone', '05/29/2023 09:00:00', '06/08/2023 23:00:00', '0'),
        new schedule('people', '05/30/2023 01:00:00', '06/10/2023 10:00:00', '1'),
        new schedule('people', '05/30/2023 23:00:00', '06/11/2023 13:00:00', '1'),
    ]
    const hcp_1 = new hcp(1, 'Dr Jack Smith', '2', 1, 'Hospital name 1', scheduleList1)
    result.push(hcp_1)

    // mock data 2
    const scheduleList2 = [
        new schedule('mail', '04/02/2023 09:00:00', '04/04/2023 18:00:00', '1'),
        new schedule('phone', '04/12/2023 09:00:00', '04/15/2023 18:00:00', '0'),
        new schedule('edit', '04/22/2023 09:00:00', '05/02/2023 18:00:00', '1'),
        new schedule('people', '05/03/2023 02:00:00', '05/08/2023 09:00:00', '1'),
        new schedule('phone', '05/04/2023 16:00:00', '05/11/2023 18:00:00', '1'),
        new schedule('mail', '05/08/2023 09:00:00', '05/12/2023 13:00:00', '1'),
        new schedule('computer', '05/09/2023 12:00:00', '05/15/2023 18:00:00', '0'),
        new schedule('mail', '05/10/2023 08:00:00', '05/28/2023 23:00:00', '1'),
        new schedule('people', '05/11/2023 03:00:00', '05/22/2023 18:00:00', '1'),
        new schedule('mail', '05/15/2023 09:00:00', '05/23/2023 10:00:00', '0'),
        new schedule('people', '05/16/2023 06:00:00', '05/25/2023 11:00:00', '1'),
        new schedule('computer', '05/13/2023 09:00:00', '05/15/2023 11:00:00', '1'),
        new schedule('people', '05/22/2023 22:00:00', '06/01/2023 11:00:00', '1'),
        new schedule('computer', '05/23/2023 19:00:00', '06/02/2023 10:00:00', '1'),
        new schedule('people', '05/24/2023 09:00:00', '06/05/2023 10:00:00', '1'),
        new schedule('phone', '05/29/2023 09:00:00', '06/08/2023 10:00:00', '1'),
        new schedule('people', '05/30/2023 01:00:00', '06/09/2023 10:00:00', '0'),
        new schedule('people', '05/14/2023 23:00:00', '05/31/2023 10:00:00', '1'),
        new schedule('people', '05/17/2023 23:00:00', '06/03/2023 14:00:00', '0'),
        new schedule('people', '05/28/2023 23:00:00', '06/10/2023 10:00:00', '1'),
        new schedule('people', '05/27/2023 23:00:00', '06/04/2023 12:00:00', '1'),
        new schedule('people', '05/19/2023 23:00:00', '06/12/2023 10:00:00', '1'),
        new schedule('people', '05/31/2023 23:00:00', '06/24/2023 10:00:00', '0'),
    ]
    const hcp_2 = new hcp(2, 'Dr Jon Maeda', '3', 1, 'Hospital name 2', scheduleList2)
    result.push(hcp_2)

    // mock data 3
    const scheduleList3 = [
        new schedule('mail', '04/02/2023 09:00:00', '04/04/2023 18:00:00', '1'),
        new schedule('phone', '04/12/2023 09:00:00', '04/15/2023 18:00:00', '0'),
        new schedule('edit', '04/22/2023 09:00:00', '05/02/2023 18:00:00', '1'),
        new schedule('people', '05/03/2023 02:00:00', '05/08/2023 22:00:00', '1'),
        new schedule('phone', '05/04/2023 16:00:00', '05/11/2023 21:00:00', '1'),
        new schedule('computer', '05/09/2023 12:00:00', '05/15/2023 18:00:00', '0'),
        new schedule('mail', '05/10/2023 08:00:00', '05/28/2023 23:00:00', '1'),
        new schedule('people', '05/11/2023 03:00:00', '05/22/2023 12:00:00', '1'),
        new schedule('computer', '05/13/2023 09:00:00', '05/15/2023 11:00:00', '1'),
        new schedule('people', '05/22/2023 22:00:00', '06/01/2023 19:00:00', '1'),
        new schedule('computer', '05/23/2023 19:00:00', '06/02/2023 18:00:00', '1'),
        new schedule('phone', '05/29/2023 09:00:00', '06/08/2023 15:00:00', '1'),
        new schedule('edit', '05/14/2023 23:00:00', '05/30/2023 19:00:00', '1'),
        new schedule('people', '05/28/2023 23:00:00', '06/10/2023 11:00:00', '1'),
        new schedule('people', '05/27/2023 23:00:00', '06/04/2023 04:00:00', '1'),
        new schedule('people', '05/19/2023 23:00:00', '06/12/2023 18:00:00', '1'),
        new schedule('people', '05/30/2023 23:00:00', '06/24/2023 15:00:00', '0'),
    ]
    const hcp_3 = new hcp(2, 'Dr Kate Green', '2', 2, 'Hospital name 3', scheduleList3)
    result.push(hcp_3)

    return result
}