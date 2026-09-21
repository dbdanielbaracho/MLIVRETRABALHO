import { Body, Controller, Get, Param, Post } from '@nestjs/common';

type Job = { id:string; title:string; startsAt:string; endsAt:string; location:string; payCents:number; status:'open'|'confirmed' };
type Interest = { jobId:string; professionalId:string; status:'interested'|'confirmed' };

const jobs: Job[] = [
  { id:'job-demo-1', title:'Garçom', startsAt:'2026-09-21T18:00:00-03:00', endsAt:'2026-09-21T23:00:00-03:00', location:'São Paulo', payCents:15000, status:'open' },
];
const interests: Interest[] = [];

@Controller('jobs')
export class JobsController {
  @Get()
  list(): Job[] { return jobs.filter((job)=>job.status==='open'); }

  @Post(':jobId/interest')
  expressInterest(@Param('jobId') jobId:string, @Body() body:{professionalId?:string}): Interest {
    const job=jobs.find((item)=>item.id===jobId);
    if(!job) throw new Error('job_not_found');
    const professionalId=body.professionalId ?? 'professional-demo';
    const existing=interests.find((item)=>item.jobId===jobId && item.professionalId===professionalId);
    if(existing) return existing;
    const interest:Interest={jobId,professionalId,status:'interested'};
    interests.push(interest);
    return interest;
  }

  @Get(':jobId/interest/:professionalId')
  getInterest(@Param('jobId') jobId:string,@Param('professionalId') professionalId:string):Interest|null {
    return interests.find((item)=>item.jobId===jobId && item.professionalId===professionalId) ?? null;
  }
}
