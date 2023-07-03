import { NextResponse } from "next/server"
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: 'ddggaltio',
  api_key: '436117537362383',
  api_secret: 'pzoLtZoOUkCgQZdd5roOLDr7_1k'
});

export async function POST(
  request: Request
) {
  const { path } = await request.json()

  if(!path) return NextResponse.json( 
    { message: "Image path is required" }, 
    { status: 400 }
  )

  try {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      transformation: [{ width: 1000, height: 752, crop: 'scale' }]
    }

    const result = await cloudinary.uploader.upload(path, options)
    return NextResponse.json(result, { status: 200 })

  } catch (error: any) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}