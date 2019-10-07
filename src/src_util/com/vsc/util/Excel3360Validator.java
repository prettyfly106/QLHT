package com.vsc.util;

/*
 * author ducnm
 * validate xls,xlsx
 */
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

public class Excel3360Validator {
	public final static String UNKNOWN = "Có lỗi hệ thống";
	public final static String FORMAT_NOT_MATCH_XSSF = "Báo cáo không đúng định dạng XLSX";
	public final static String FORMAT_NOT_MATCH_HSSF = "Báo cáo không đúng định dạng XLS";
	public final static String NO_RECORD = "Báo cáo không được rỗng";
	public final static String NO_DATA_FOUND = "Báo cáo không có dữ liệu";
	public final static String TOTAL_RECORDS_NOT_MATCH = "Báo cáo không đủ số trường bắt buộc";
	public static String COLUMN_NOT_MATCH = "";
	public final static String SUCCESS = "Báo cáo hợp lệ";
	private final static String XSSF_TYPE = "xlsx";
	private final static String HSSF_TYPE = "xls";

	private static String[] map79aReport = { "stt", "ma_bn", "ho_ten", "ngay_sinh", "gioi_tinh", "dia_chi", "ma_the",
			"ma_dkbd", "gt_the_tu", "gt_the_den", "ma_benh", "ma_benhkhac", "ma_lydo_vvien", "ma_noi_chuyen",
			"ngay_vao", "ngay_ra", "so_ngay_dtri", "ket_qua_dtri", "tinh_trang_rv", "t_tongchi", "t_xn", "t_cdha",
			"t_thuoc", "t_mau", "t_pttt", "t_vtyt", "t_dvkt_tyle", "t_thuoc_tyle", "t_vtyt_tyle", "t_kham", "t_vchuyen",
			"t_bntt", "t_bhtt", "t_ngoaids", "ma_khoa", "nam_qt", "thang_qt", "ma_khuvuc", "ma_loaikcb", "ma_cskcb",
			"noi_ttoan", "giam_dinh", "t_xuattoan", "lydo_xt", "t_datuyen", "t_vuottran" };

	private static String[] map80aReport = { "stt", "ma_bn", "ho_ten", "ngay_sinh", "gioi_tinh", "dia_chi", "ma_the",
			"ma_dkbd", "gt_the_tu", "gt_the_den", "ma_benh", "ma_benhkhac", "ma_lydo_vvien", "ma_noi_chuyen",
			"ngay_vao", "ngay_ra", "so_ngay_dtri", "ket_qua_dtri", "tinh_trang_rv", "t_tongchi", "t_xn", "t_cdha",
			"t_thuoc", "t_mau", "t_pttt", "t_vtyt", "t_dvkt_tyle", "t_thuoc_tyle", "t_vtyt_tyle", "t_kham", "t_vchuyen",
			"t_bntt", "t_bhtt", "t_ngoaids", "ma_khoa", "nam_qt", "thang_qt", "ma_khuvuc", "ma_loaikcb", "ma_cskcb",
			"noi_ttoan", "giam_dinh", "t_xuattoan", "lydo_xt", "t_datuyen", "t_vuottran" };

	private static String[] map19BHYT = { "stt", "ma_vtyt", "ten_vtyt", "ten_thuongmai", "quy_cach", "don_vi",
			"gia_mua", "sl_noitru", "sl_ngoaitru", "gia_thanhtoan", "thanh_tien" };
	private static String[] map20BHYT = { "stt", "stt_byt", "ten_hoachat", "ten_thuoc", "duong_dung", "ham_luong",
			"so_dky", "don_vi", "sl_noitru", "sl_ngoaitru", "don_gia", "thanh_tien" };
	private static String[] map21BHYT = { "stt", "ma_dvkt", "ten_dvkt", "sl_noitru", "sl_ngoaitru", "don_gia",
			"thanh_tien" };

	public Excel3360Validator() {
	}

	public static int validateExcelReport(InputStream excelFile, int reportType) throws FileNotFoundException {
		return validateExcelReport(excelFile, reportType, XSSF_TYPE);
	}

	public static int validateExcelReport(InputStream excelFileToRead, int reportType, String excelType)
			throws FileNotFoundException {
		String message = null;
		int i = 0;
		try {
			if (reportType == 4) {
				i = checkNumberColReport(excelFileToRead, map79aReport, excelType);
			} else if (reportType == 5) {
				i = checkNumberColReport(excelFileToRead, map80aReport, excelType);
			} else if (reportType == 6) {
				i = checkNumberColReport(excelFileToRead, map19BHYT, excelType);
			} else if (reportType == 7) {
				i = checkNumberColReport(excelFileToRead, map20BHYT, excelType);
			} else if (reportType == 8) {
				i = checkNumberColReport(excelFileToRead, map21BHYT, excelType);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return i;
	}

	private static int checkNumberColReport(InputStream excelFile, String[] arrayCol, String typeRpt) {
		Workbook wb = null;
		int r = 0;
		try {
			if (typeRpt.equals(XSSF_TYPE))
				wb = new XSSFWorkbook(excelFile);
			else if (typeRpt.equals(HSSF_TYPE)) {
				wb = new HSSFWorkbook(excelFile);
			}
			Sheet sheet = wb.getSheetAt(0);
			Row row = sheet.getRow(0);
			int rowCount = sheet.getLastRowNum();
			int colCount = row.getLastCellNum();
			if (rowCount == 0) {
				r = -1;
			} else if (colCount == 0) {
				r = -2;
			} else if (colCount < arrayCol.length) {
				r = -3;
			} else {
				r = checkColumnNameReport(row, arrayCol);
				System.out.println(COLUMN_NOT_MATCH);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				wb.close();
				excelFile.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return r;
	}

	private static int checkColumnNameReport(Row row, String[] arrayCol) {
		int r = 1, j, k, i = 0;
		String tmp = "";
		String tmp2 = "";
		Cell cell = null;
		for (; i < arrayCol.length; i++) {
			cell = row.getCell(i);
			tmp = cell.getStringCellValue().trim().toLowerCase();
			k = i;
			j = i;
			if (tmp != null) {
				for (; j < arrayCol.length; j++) {
					if (tmp.equals(arrayCol[j])) {
						k = j;
						break;
					} else if (j == arrayCol.length - 1) {
						COLUMN_NOT_MATCH = "Cột " + tmp + " không đúng so với mẫu báo cáo ";
						r = -4;
					}
				}
				if (k != i) {
					tmp2 = arrayCol[k];
					arrayCol[k] = arrayCol[i];
					arrayCol[i] = tmp2;
				}
			}
		}
		return r;
	}
}
