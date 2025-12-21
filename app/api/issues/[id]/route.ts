import { patchIssueSchema } from "@/app/validationSchema";
import prisma from "@/prisma/client";
import delay from 'delay';
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, {params}:{params: {id:string}}){
        const body = await request.json();
        const validation = patchIssueSchema.safeParse(body);
        if(!validation.success)
            return NextResponse.json(validation.error.format(), {status:400})
        const issue = await prisma.issue.findUnique({
            where:{id:parseInt(params.id)}
        });

        const{assignedToUserId} = body;
        if(assignedToUserId){
            const user = await prisma.user.findUnique({where:{id: assignedToUserId}})
            if(!user){
                return NextResponse.json({error:'Invalid user'}, {status:404});
            }
        }

        if(!issue)
            return NextResponse.json({error:'Invalid issue'}, {status:404})

        const updatedIssue = await prisma.issue.update({
            where: {id: issue.id},
            data: {
                title: body.title,
                description: body.description,
                assignedToUserId,
                status: body.status
            },
        });

        return NextResponse.json(updatedIssue);
    }

    export async function DELETE(request: NextRequest, {params}:{params: {id:string}}){
        await delay(1000);
        const issue = await prisma.issue.findUnique({
            where:{id:parseInt(params.id)}
        });

        if(!issue)
            return NextResponse.json({error:'Invalid issue'}, {status:404})
        const deleteIssue = await prisma.issue.delete({
            where:{id:issue.id}
        }); 
        return NextResponse.json(deleteIssue);
    }

    export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params.id) },
        });

        if (!issue) return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

        return NextResponse.json(issue);
    }



