import { ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { LocationModule } from './location/location.module';
// import { EmployeeModule } from './employee/employee.module';
// import { ProjectModule } from './project/project.module';

@Module({
  imports: [GraphQLModule.forRoot<ApolloFederationDriverConfig>(
    {
      driver: ApolloFederationDriver,
      autoSchemaFile: join(process.cwd(), 'src/graphql-schema.gql'),
    }
  ),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'locations',
    entities: ["dist/**/*.entity{.ts,.js}"], //tell typeORM, look at this files and create a table for us
    synchronize: true, // only use  in dev env, if something is changed in entity then it will modify the database
  }), LocationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
