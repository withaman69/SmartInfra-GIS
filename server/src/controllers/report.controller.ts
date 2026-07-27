import { Request, Response } from "express";
import { prisma } from "../config/db";
const { Parser } = require("json2csv");
import PDFDocument from "pdfkit";
export class ReportController {
  static async assetReport(
    req: Request,
    res: Response
  ) {
    try {
      const assets =
        await prisma.asset.findMany();

      res.json({
        success: true,
        assets,
      });
    } catch (error) {
      console.error(error);

      res.status(500).json({
        success: false,
      });
    }
  }
  static async exportAssetsCSV(
  req: Request,
  res: Response
) {
  try {
    const assets =
      await prisma.asset.findMany();

    const parser =
      new Parser();

    const csv =
      parser.parse(
        assets
      );

    res.header(
      "Content-Type",
      "text/csv"
    );

    res.attachment(
      "assets-report.csv"
    );

    return res.send(
      csv
    );
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}
static async exportAssetsPDF(
  req: Request,
  res: Response
) {
  try {
    const assets =
      await prisma.asset.findMany();

    const doc =
      new PDFDocument();

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=assets-report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(20)
      .text(
        "SmartInfra GIS Asset Report"
      );

    doc.moveDown();

    assets.forEach(
      (asset, index) => {
        doc.text(
          `${index + 1}. ${asset.name}`
        );

        doc.text(
          `Type: ${asset.assetType}`
        );

        doc.text(
          `Status: ${asset.status}`
        );

        doc.text(
          `Health Score: ${asset.healthScore}`
        );

        doc.moveDown();
      }
    );

    doc.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
}
}