import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import * as driversData from '../../crawler/data/drivers.json';
import { DataSource } from 'typeorm';
import { Driver } from 'src/drivers/entities/driver.entity';

export default class DriverSeeder implements Seeder {
  run(dataSource: DataSource): Promise<any> {
    const driversRepository = dataSource.getRepository(Driver);

    const data = driversData.map((driver) => {
      const newDriver = new Driver();
      newDriver.position = parseInt(driver['Pos']);
      newDriver.year = parseInt(driver['Year']);
      newDriver.name = driver['Driver'];
      newDriver.nationality = driver['Nationality'];
      newDriver.team = driver['Car'];
      newDriver.points = parseInt(driver['PTS']);
      return newDriver;
    });

    return driversRepository.save(data);
  }
}
