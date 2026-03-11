// ═══════════════════════════════════════════════════════
// AJK SITE CONTROL — APPLICATION LAYER
// Architecture: multi-file (data.js + app.js)
// Forms library: extracted from single-file build (all 5 scopes × 13 forms)
// Location model: project → block → level → area
// ═══════════════════════════════════════════════════════

// TABLE CONFIGS — used by both screed & CB
// ═══════════════════════════════════════════════════════
const TABLE_DEFS = {
  batch_table:      {cols:['Batch No.','Time','Cement (kg)','Sand (kg)','Water (L)','Additive (ml)','Fibre (kg)','Dev %','Pour Area','Accepted Y/N'],rows:6},
  nc_table:         {cols:['Batch No.','Time','Reason for Rejection','Action Taken','Verified By'],rows:3},
  thickness_table:  {cols:['Room Ref','Check No.','Location','Measured (mm)','Design (mm)','Within Tol Y/N','Action?','Initials'],rows:8},
  nc_thick_table:   {cols:['Room Ref','Check No.','Deficiency','Corrective Action','Verified By','Date'],rows:3},
  room_summary:     {cols:['Room Ref','Area (m²)','No. Checks Req.','No. Completed','Compliant Y/N'],rows:5},
  sr_table:         {cols:['Room Ref','Test No.','Location','Measured Dev (mm)','Permitted Dev (mm)','Within Tol Y/N','Action?','Initials'],rows:8},
  sr_nc_table:      {cols:['Room Ref','Test No.','Defect','Rectification','Re-Test Result (mm)','Verified By','Date'],rows:3},
  rh_table:         {cols:['Room Ref','Test No.','Location','RH (%)','Amb Temp (°C)','Floor Temp (°C)','Limit (%)','Within Y/N','Initials'],rows:6},
  rh_nc_table:      {cols:['Room Ref','Test No.','Reading (%)','Action Taken','Re-Test Date','Re-Test (%)','Verified By'],rows:3},
  dh_table:         {cols:['Room Ref','Test No.','Location','Indent 1','Indent 2','Indent 3','Avg ISCR','Max Permitted','Within Y/N','Initials'],rows:6},
  curing_table:     {cols:['Date','Day No.','Ambient Temp (°C)','Weather','Trafficked Y/N','Protection Intact Y/N','Initials'],rows:14},
  defect_table:     {cols:['Location','Defect Type','Severity','Corrective Action','Date Rectified','Verified By'],rows:4},
  delivery_table:   {cols:['Date','Material','Supplier','Ticket No.','Batch No.','Qty','DoP/TDS Y/N','Accepted Y/N','Storage','Initials'],rows:8},
  batch_alloc:      {cols:['Batch No.','Material Type','Install No.','Block/Level','Date Used','Initials'],rows:5},
  rejected_table:   {cols:['Date','Material','Reason','Returned Y/N','NCR Y/N','Recorded By'],rows:3},
  equip_table:      {cols:['Equip ID','Type','Manufacturer','Model','Serial No.','Used For','Interval','Last Calib.','Expiry','Cert Ref','Status'],rows:6},
  oc_table:         {cols:['Equip ID','Type','Date Found','Reason','Action Taken','Returned To Service','Verified By'],rows:3},
  level_check:      {cols:['Room Ref','Check No.','Location','Actual Level (mm)','Design FFL (mm)','Within Tol Y/N','Action?','Initials'],rows:8},
  level_nc:         {cols:['Room Ref','Check No.','Deficiency','Corrective Action','Verified By','Date'],rows:3},
  mc_table:         {cols:['Room Ref','Test No.','Location','MC Reading (%)','Amb Temp (°C)','Batten Temp (°C)','MC Limit (%)','Within Y/N','Initials'],rows:6},
  mc_nc_table:      {cols:['Room Ref','Test No.','MC (%)','Action Taken','Re-Test Date','Re-Test MC (%)','Verified By'],rows:3},
  walk_table:       {cols:['Room Ref','Test No.','Location','Squeak Y/N','Movement Y/N','Rocking Y/N','Result','Action?','Pass/Fail','Initials'],rows:6},
  walk_nc:          {cols:['Room Ref','Test No.','Result','Defect','Action Taken','Re-Test Result','Verified By','Date'],rows:3},
  protection_daily: {cols:['Date','Day No.','Amb Temp (°C)','Weather','Trafficked Y/N','Notes','Initials'],rows:14},
  premature_check:  {cols:['Date','Visual Inspection Y/N','Batten Damage','Cradle Movement','Action Taken','Initials'],rows:5},
  post_level_check: {cols:['Location','Loc. Description','Design FFL (mm)','Within Tol Y/N','Action?','Verified By'],rows:5},
  room_sr_summary:  {cols:['Room Ref','Area (m²)','Tests Required','Tests Done','Compliant Y/N'],rows:5},
  room_mc_summary:  {cols:['Room Ref','Area (m²)','Tests Required','Tests Done','Compliant Y/N'],rows:5},
  room_walk_summary:{cols:['Room Ref','Area (m²)','Tests Required','Tests Done','Compliant Y/N'],rows:5},
  cb_benchmark_level:{cols:['Room Ref','No. Checks','Min Required','Within Tol Y/N','Comments'],rows:5},
  cb_benchmark_sr:  {cols:['Test Location','Measured Dev (mm)','Within Tol Y/N','Comments'],rows:5},
  cb_install_rec:   {cols:['Area Ref','Time','Cradle Centres (mm)','Fixing Centres (mm)','Batten MC (%)','FFL Achieved (mm)','SR Y/N','Walk Test Y/N','Dev (mm)','Area Ref','Initials','Batch Accepted Y/N'],rows:6},
  cb_install_nc:    {cols:['Area Ref','Time','Cradle Centres (mm)','Fixing Centres (mm)'],rows:3},
};

function renderTable(id){
  const cfg = TABLE_DEFS[id];
  if(!cfg) return `<div class="f-hint">Table definition missing for: ${id}</div>`;
  let h=`<div class="tbl-wrap"><table class="dtbl" id="tbl_${id}">
    <thead><tr>${cfg.cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead>
    <tbody>`;
  for(let r=0;r<cfg.rows;r++) h+=`<tr>${cfg.cols.map(()=>`<td><input type="text" placeholder="—"></td>`).join('')}</tr>`;
  h+=`</tbody></table>
  <button type="button" class="add-row" onclick="addRow('tbl_${id}',${cfg.cols.length})">+ Add Row</button></div>`;
  return h;
}
function addRow(tid,n){
  const tb=document.querySelector(`#${tid} tbody`);
  if(!tb)return;
  const tr=document.createElement('tr');
  for(let i=0;i<n;i++) tr.innerHTML+=`<td><input type="text" placeholder="—"></td>`;
  tb.appendChild(tr);
}

// ═══════════════════════════════════════════════════════
// SCREED FORM DEFINITIONS (13 forms)
// ═══════════════════════════════════════════════════════
const SCREED_FORMS = [
  {id:'F00',title:'Benchmark Acceptance',hold:true,qitp:'PRC-05',freq:'First Pour Only',
   desc:'Benchmark pour inspection. Method, finish, thickness and curing accepted as project standard before production pours begin.',
   sections:[
    {title:'Pour Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'weather',label:'Weather',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
    ]},
    {title:'Material Confirmation',num:'02',fields:[
      {id:'cement_ok',label:'Cement grade matches approved submittal',type:'yn',hint:'BS EN 197-1',req:true},
      {id:'fibre_ok',label:'Fibre type & dosage confirmed',type:'yn',hint:'EN 14889-2',req:true},
      {id:'additive_ok',label:'Additive type confirmed',type:'yn',hint:'Approved TDS',req:true},
      {id:'water_ok',label:'Water source verified',type:'yn',hint:'BS EN 1008',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Verification',num:'03',fields:[
      {id:'substrate_prep',label:'Substrate prepared per F01',type:'yn',req:true},
      {id:'membrane_inst',label:'Membrane correctly installed',type:'yn',req:true},
      {id:'thickness_ctrl',label:'Thickness control demonstrated',type:'yn',req:true},
      {id:'compaction',label:'Compaction adequate',type:'yn',req:true},
      {id:'joint_form',label:'Joint formation correct',type:'yn',req:true},
      {id:'install_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Declaration',num:'04',fields:[
      {id:'outcome',label:'Benchmark Outcome',type:'select',opts:['Accepted – Production Pours May Proceed','Accepted Subject to Minor Rectification','Rejected – Further Benchmark Required'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'ajk_rep',label:'AJK Contracts / Design Rep',type:'text',req:true},
      {id:'mpx_pm',label:'MPX Package Manager',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'notes',label:'Additional Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F01',title:'Pre-Pour Checklist',hold:false,qitp:'SC-01 to SC-06',freq:'Every Pour',
   desc:'Complete before every screed pour. Covers area release, substrate inspection, slip membrane and insulation checks.',
   sections:[
    {title:'Pour Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'pour_num',label:'Pour Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'weather',label:'Weather',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Rep',type:'text',req:true},
    ]},
    {title:'Area Release',num:'02',fields:[
      {id:'area_release',label:'Formal Area Release Received',type:'yn',hint:'MPX Area Release Confirmed',req:true},
      {id:'no_trades',label:'No conflicting trades present',type:'yn',req:true},
      {id:'access_ok',label:'Access & logistics confirmed',type:'yn',req:true},
      {id:'area_comments',label:'Comments',type:'textarea',full:true},{id:'area_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Substrate Inspection',num:'03',fields:[
      {id:'sub_clean',label:'Substrate clean',type:'yn',hint:'Free of debris, laitance, contamination',req:true},
      {id:'no_water',label:'No standing water',type:'yn',req:true},
      {id:'levels_ok',label:'Levels within tolerance',type:'yn',req:true},
      {id:'services_ok',label:'Services pressure tested',type:'yn',hint:'Confirmed by others',req:true},
      {id:'upstands_ok',label:'Perimeter upstands correct',type:'yn',req:true},
      {id:'sub_comments',label:'Comments',type:'textarea',full:true},{id:'sub_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Slip Membrane',num:'04',fields:[
      {id:'mem_type',label:'Correct membrane type',type:'yn',req:true},{id:'mem_undamaged',label:'Membrane undamaged',type:'yn',req:true},
      {id:'laps_150',label:'Laps minimum 150mm',type:'yn',req:true},{id:'laps_taped',label:'Laps taped / sealed',type:'yn',req:true},
      {id:'upstands_mem',label:'Upstands maintained',type:'yn',req:true},
      {id:'mem_comments',label:'Comments',type:'textarea',full:true},{id:'mem_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Insulation',num:'05',fields:[
      {id:'ins_thickness',label:'Insulation thickness compliant',type:'yn',req:true},
      {id:'ins_condition',label:'Insulation condition good',type:'yn',req:true},
      {id:'buildup_ok',label:'Overall build-up depth achievable',type:'yn',req:true},
      {id:'ins_measured',label:'Measured Thickness (mm)',type:'number'},
      {id:'ins_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Supervisor Declaration',num:'06',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_name',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'overall_status',label:'Overall Form Status',type:'select',opts:['All Items Compliant','Minor Issues Noted — Works May Proceed','HOLD — Do Not Proceed'],req:true,full:true},
      {id:'notes',label:'Additional Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F02',title:'Batching Record Sheet',hold:false,qitp:'SC-07 to SC-09',freq:'Every Pour',
   desc:'Record each batch during the pour. Cement, sand, water, additive and fibre quantities. Deviations >±5% must be rejected.',
   sections:[
    {title:'Pour Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'pour_num',label:'Pour Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'weather',label:'Weather',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
      {id:'mix_ref',label:'Mix Design Reference',type:'text',req:true},{id:'strength_class',label:'Compressive Strength Class',type:'text',req:true},
      {id:'batch_supervisor',label:'Batching Supervisor',type:'text',req:true},
    ]},
    {title:'Material Verification',num:'02',fields:[
      {id:'cement_type',label:'Cement type verified',type:'yn',req:true},{id:'cement_batch',label:'Cement batch recorded',type:'yn',req:true},
      {id:'sand_source',label:'Sand source confirmed',type:'yn',req:true},{id:'additive_type',label:'Additive type confirmed',type:'yn',req:true},
      {id:'fibre_type',label:'Fibre type confirmed',type:'yn',req:true},{id:'water_source',label:'Water source verified',type:'yn',req:true},
    ]},
    {title:'Batch Records',num:'03',fields:[{id:'batch_table',label:'Batch Log',type:'batch_table',full:true}]},
    {title:'Non-Conformance Record',num:'04',fields:[{id:'nc_table',label:'Rejected Batches',type:'nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'qa_manager',label:'AJK QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Additional Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F03',title:'Thickness Level Log',hold:false,qitp:'SC-08, TC-01',freq:'Every Pour',
   desc:'Thickness and level checks during placement. Record per room. Non-conformances must be corrected before compaction.',
   sections:[
    {title:'Pour Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'pour_num',label:'Pour Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'design_ffl',label:'Design FFL',type:'text',req:true},{id:'design_thick',label:'Design Thickness (mm)',type:'number',req:true},
      {id:'datum_ref',label:'Datum Reference',type:'text',req:true},{id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Measurement Log',num:'02',fields:[{id:'thickness_table',label:'Thickness Measurements',type:'thickness_table',full:true}]},
    {title:'Non-Conformance',num:'03',fields:[{id:'nc_thick_table',label:'Non-Conformance Actions',type:'nc_thick_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F04',title:'SR Test Record',hold:true,qitp:'TC-02',freq:'On Completion',
   desc:'Surface regularity straightedge testing to BS 8204-1. HOLD POINT — area must pass SR class before floor finish installation.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'sr_class',label:'Specified SR Class',type:'select',opts:['SR1 (±3mm)','SR2 (±5mm)','SR3 (±10mm)'],req:true},
      {id:'max_dev',label:'Max Permitted Deviation (mm)',type:'number',req:true},{id:'tested_by',label:'Tested By',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Straightedge Test Log',num:'03',fields:[{id:'sr_table',label:'Test Readings',type:'sr_table',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'sr_nc_table',label:'Non-Conformance Actions',type:'sr_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall SR Test Result',type:'select',opts:['PASS — Area Compliant with Specified SR Class','FAIL — Rectification Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F05',title:'Moisture Test Report',hold:true,qitp:'TC-04',freq:'Pre-Finish',
   desc:'Hygrometer RH testing to BS 8203. HOLD POINT — screed must meet RH limit before floor finish installation proceeds.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'pour_date',label:'Date Screed Poured',type:'date',req:true},{id:'age_days',label:'Age of Screed (Days)',type:'number',req:true},
      {id:'rh_limit',label:'Specified RH Limit (%)',type:'number',req:true},{id:'finish_type',label:'Floor Finish Type',type:'text',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},{id:'hygro_serial',label:'Hygrometer Serial No.',type:'text',req:true},
      {id:'calib_ref',label:'Calibration Certificate Ref',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Hygrometer Test Log',num:'03',fields:[{id:'rh_table',label:'RH Test Readings',type:'rh_table',full:true}]},
    {title:'Non-Compliant Results',num:'04',fields:[{id:'rh_nc_table',label:'Non-Compliant Actions',type:'rh_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall Moisture Test Result',type:'select',opts:['PASS — All Areas Within RH Limit','FAIL — Remedial Drying Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F06',title:'Drop Hammer Test Record',hold:false,qitp:'TC-03',freq:'On Completion',
   desc:'BRE drop hammer ISCR testing to BS 8204-1 Annex D. Categories A (≤2mm), B (≤3mm), C (≤4mm).',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'pour_date',label:'Date Screed Poured',type:'date',req:true},{id:'age_days',label:'Age (Days)',type:'number',req:true},
      {id:'screed_cat',label:'Category',type:'select',opts:['A Heavy Duty (≤2mm)','B Medium Duty (≤3mm)','C Light Duty (≤4mm)'],req:true},
      {id:'min_iscr',label:'Min ISCR Requirement (mm)',type:'number',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},{id:'bre_serial',label:'BRE Tester Serial No.',type:'text',req:true},
      {id:'calib_ref',label:'Calibration Certificate Ref',type:'text',req:true},
    ]},
    {title:'Drop Hammer Test Log',num:'02',fields:[{id:'dh_table',label:'Test Readings',type:'dh_table',full:true}]},
    {title:'Declaration',num:'03',fields:[
      {id:'overall_result',label:'Overall Result',type:'select',opts:['PASS — All Results Within ISCR Limit','FAIL — Remedial Works Required'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F07',title:'Curing Access Log',hold:false,qitp:'SC-11',freq:'Daily During Cure',
   desc:'Daily curing monitoring. Ambient temperature, weather conditions, trafficking and curing protection integrity.',
   sections:[
    {title:'Pour Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'pour_date',label:'Date Screed Poured',type:'date',req:true},
      {id:'min_cure',label:'Min. Curing Period (days)',type:'number',req:true},{id:'cure_method',label:'Curing Method',type:'text',req:true},
      {id:'release_date',label:'Release Date Eligible',type:'date',req:true},{id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Daily Curing Log',num:'02',fields:[{id:'curing_table',label:'Daily Monitoring Records',type:'curing_table',full:true}]},
    {title:'Minimum Curing Confirmation',num:'03',fields:[
      {id:'req_days',label:'Required Minimum Days',type:'number',req:true},{id:'actual_days',label:'Actual Days Achieved',type:'number',req:true},
      {id:'cure_compliant',label:'Curing Period Compliant',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F08',title:'Post Pour Inspection',hold:false,qitp:'SC-10, PC-01',freq:'Every Pour',
   desc:'Visual inspection within 24–48 hours of pour. Surface uniformity, shrinkage cracks, edge integrity and defect log.',
   sections:[
    {title:'Inspection Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'pour_date',label:'Pour Date',type:'date',req:true},
      {id:'inspection_date',label:'Inspection Date',type:'date',req:true},{id:'hours_since',label:'Hours Since Pour',type:'number',req:true},
      {id:'inspector',label:'Inspector',type:'text',req:true},
      {id:'weather',label:'Weather During Pour',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
    ]},
    {title:'Visual Inspection Checklist',num:'02',fields:[
      {id:'surface_uniform',label:'Surface uniformity — no segregation',type:'yn',req:true},
      {id:'surface_laitance',label:'Surface laitance within tolerance',type:'yn',req:true},
      {id:'shrinkage_cracks',label:'Plastic shrinkage cracks within tolerance',type:'yn',req:true},
      {id:'edge_integrity',label:'Edge integrity — no edge breakdown',type:'yn',req:true},
      {id:'joint_formation',label:'Joint formation clean and controlled',type:'yn',req:true},
      {id:'no_contamination',label:'No surface contamination',type:'yn',req:true},
      {id:'visual_comments',label:'Comments',type:'textarea',full:true},{id:'visual_photo',label:'Photo References',type:'text',full:true},
    ]},
    {title:'Defect Log',num:'03',fields:[{id:'defect_table',label:'Defects Identified',type:'defect_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'outcome',label:'Inspection Outcome',type:'select',opts:['Compliant','Requires Remedial Works','Escalated to NCR'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F09',title:'Material Delivery Log',hold:false,qitp:'MC-01 to MC-05',freq:'Every Delivery',
   desc:'Log every material delivery. Material type, batch number, DoP/TDS check, storage location and traceability.',
   sections:[
    {title:'Delivery Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'supplier',label:'Supplier',type:'text',req:true},{id:'date',label:'Date',type:'date',req:true},
      {id:'logged_by',label:'Logged By',type:'text',req:true},
    ]},
    {title:'Delivery Log',num:'02',fields:[{id:'delivery_table',label:'Deliveries Received',type:'delivery_table',full:true}]},
    {title:'Rejected Materials',num:'03',fields:[{id:'rejected_table',label:'Rejected Materials',type:'rejected_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F10',title:'Calibration Register',hold:false,qitp:'PRC-04, TC-03, TC-04',freq:'Periodic',
   desc:'Equipment calibration status register. All hygrometers, BRE testers and inspection equipment must be in-date.',
   sections:[
    {title:'Register Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'maintained_by',label:'Maintained By',type:'text',req:true},{id:'review_date',label:'Last Review Date',type:'date',req:true},
    ]},
    {title:'Equipment Register',num:'02',fields:[{id:'equip_table',label:'Equipment',type:'equip_table',full:true}]},
    {title:'Out of Calibration Record',num:'03',fields:[{id:'oc_table',label:'Out of Calibration / Quarantine',type:'oc_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'qa_manager',label:'QA Manager',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'all_calibrated',label:'All equipment in-date',type:'yn',req:true,full:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F11',title:'QA Pack Index',hold:true,qitp:'TC-05',freq:'On Completion',
   desc:'Confirms all F00–F10 records are complete and signed. All hold points closed. HOLD POINT before Aconex submission.',
   sections:[
    {title:'Pack Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',val:'TVC-AJK-EE-ZZ-QP-X-00007',req:true},
      {id:'pour_num',label:'Pour Number',type:'text',req:true},{id:'block',label:'Block / Plot',type:'text',req:true},
      {id:'level',label:'Level',type:'text',req:true},{id:'completion_date',label:'Date of Completion',type:'date',req:true},
      {id:'compiled_by',label:'Compiled By',type:'text',req:true},
    ]},
    {title:'Inspection Records Checklist',num:'02',fields:[
      {id:'f00_incl',label:'F00 Benchmark Acceptance (if applicable)',type:'yn'},
      {id:'f01_incl',label:'F01 Pre-Pour Checklist',type:'yn',req:true},
      {id:'f02_incl',label:'F02 Batching Record Sheet',type:'yn',req:true},
      {id:'f03_incl',label:'F03 Thickness Level Log',type:'yn',req:true},
      {id:'f04_incl',label:'F04 SR Test Record (HOLD)',type:'yn',req:true},
      {id:'f05_incl',label:'F05 Moisture Test Report (HOLD)',type:'yn',req:true},
      {id:'f06_incl',label:'F06 Drop Hammer Test',type:'yn'},
      {id:'f07_incl',label:'F07 Curing Access Log',type:'yn',req:true},
      {id:'f08_incl',label:'F08 Post Pour Inspection',type:'yn',req:true},
      {id:'f09_incl',label:'F09 Material Delivery Log',type:'yn',req:true},
      {id:'f10_incl',label:'F10 Calibration Register',type:'yn',req:true},
    ]},
    {title:'Hold Point Confirmation',num:'03',fields:[
      {id:'hp_prc05',label:'PRC-05 Benchmark Accepted',type:'yn',req:true},
      {id:'hp_tc02',label:'TC-02 Surface Regularity Compliant',type:'yn',req:true},
      {id:'hp_tc04',label:'TC-04 Moisture Criteria Achieved',type:'yn',req:true},
      {id:'hp_tc05',label:'TC-05 QA Pack Compiled',type:'yn',req:true},
    ]},
    {title:'Submission & Declaration',num:'04',fields:[
      {id:'aconex_mail',label:'Aconex Mail Type',type:'text',req:true},{id:'aconex_ref',label:'Aconex Reference No.',type:'text',req:true},
      {id:'submit_date',label:'Date Submitted',type:'date',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'contracts_mgr',label:'AJK Contracts Manager',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F12',title:'Area Handover Certificate',hold:true,qitp:'Handover',freq:'Final Handover',
   desc:'Formal area release to Multiplex. All QITP tests passed and hold points closed. Screed released for floor finish installation.',
   sections:[
    {title:'Handover Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',val:'TVC-AJK-EE-ZZ-QP-X-00007',req:true},
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'pour_nums',label:'Pour Numbers',type:'text',req:true},
      {id:'screed_complete',label:'Date of Screed Completion',type:'date',req:true},
      {id:'handover_date',label:'Date of Handover Inspection',type:'date',req:true},
    ]},
    {title:'Compliance Summary',num:'02',fields:[
      {id:'c_thickness',label:'F03 — Thickness ≥ Design Minimum',type:'yn',req:true},
      {id:'c_sr',label:'F04 — SR Class Achieved',type:'yn',req:true},
      {id:'c_moisture',label:'F05 — Moisture ≤ Specified RH',type:'yn',req:true},
      {id:'c_dh',label:'F06 — Drop Hammer Within ISCR Limit',type:'yn'},
      {id:'c_cure',label:'F07 — Minimum Curing Period Achieved',type:'yn',req:true},
      {id:'c_postpour',label:'F08 — No Unresolved Defects',type:'yn',req:true},
      {id:'c_qapack',label:'F11 — QA Pack Submitted via Aconex',type:'yn',req:true},
    ]},
    {title:'Area Condition',num:'03',fields:[
      {id:'no_contamination',label:'Surface free from contamination',type:'yn',req:true},
      {id:'no_water',label:'No standing water',type:'yn',req:true},
      {id:'no_cracking',label:'No visible cracking beyond tolerance',type:'yn',req:true},
      {id:'no_laitance',label:'No laitance beyond acceptable limits',type:'yn',req:true},
      {id:'no_loading',label:'No premature loading damage',type:'yn',req:true},
      {id:'suitable_finish',label:'Area suitable for floor finish installation',type:'yn',req:true},
    ]},
    {title:'Declaration',num:'04',fields:[
      {id:'outstanding',label:'Outstanding Items',type:'select',opts:['No outstanding defects','Minor snags listed in notes (non-structural)','NCRs raised and closed'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'ajk_qa',label:'AJK QA Manager',type:'text',req:true},
      {id:'mpx_rep',label:'MPX Representative',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'notes',label:'Notes / Snag List',type:'textarea',full:true},
    ]},
  ]},
];
// ═══════════════════════════════════════════════════════
// CRADLE & BATTEN FORM DEFINITIONS (13 forms)
// ═══════════════════════════════════════════════════════
const CB_FORMS = [
  {id:'F00',title:'Benchmark Acceptance',hold:true,qitp:'PRC-05, PRC-06',freq:'First Install Only',
   desc:'Benchmark installation inspection. Material, method, level and walk test accepted as project standard before production installs begin.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'weather',label:'Weather',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
    ]},
    {title:'Material Confirmation',num:'02',fields:[
      {id:'batten_grade',label:'Batten species and grade match approved submittal',type:'yn',hint:'BS 8201 / Approved submittal',req:true},
      {id:'batten_mc',label:'Batten moisture content within specification',type:'yn',hint:'Typically 12–18% MC',req:true},
      {id:'cradle_type',label:'Cradle type and load rating confirmed',type:'yn',hint:'As per approved submittal',req:true},
      {id:'fixing_spec',label:'Fixing type, diameter and length confirmed',type:'yn',hint:'As per specification and drawings',req:true},
      {id:'dpm_ok',label:'DPM / acoustic layer confirmed (if applicable)',type:'yn',hint:'As per approved submittal'},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Verification',num:'03',fields:[
      {id:'substrate_prep',label:'Substrate prepared in accordance with F01',type:'yn',req:true},
      {id:'membrane_inst',label:'Membrane correctly installed',type:'yn',hint:'150mm laps / upstands',req:true},
      {id:'cradle_level',label:'Cradle levelling method demonstrated',type:'yn',hint:'Laser level / datum',req:true},
      {id:'batten_fix',label:'Batten fixing centres correct',type:'yn',hint:'As per specification',req:true},
      {id:'perimeter_gap',label:'Perimeter gap maintained',type:'yn',req:true},
      {id:'install_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Level Compliance',num:'04',fields:[
      {id:'design_ffl',label:'Design FFL',type:'text',req:true},{id:'design_buildup',label:'Design Build-Up',type:'text',req:true},
      {id:'datum_ref',label:'Datum Reference Used',type:'text',req:true},
      {id:'cb_benchmark_level',label:'Level Check Summary',type:'cb_benchmark_level',full:true},
    ]},
    {title:'Surface Regularity & Walk Test',num:'05',fields:[
      {id:'sr_class',label:'Specified SR Class',type:'text',req:true},{id:'sr_deviation',label:'Permitted Deviation (mm)',type:'number',req:true},
      {id:'cb_benchmark_sr',label:'SR Test Log',type:'cb_benchmark_sr',full:true},
      {id:'walk_test_ok',label:'Walk test — no squeaking or movement',type:'yn',hint:'No movement, rocking or squeaking',req:true},
      {id:'walk_comments',label:'Walk Test Comments',type:'textarea',full:true},
    ]},
    {title:'Declaration',num:'06',fields:[
      {id:'outcome',label:'Benchmark Outcome',type:'select',opts:['Accepted – Production Installs May Proceed','Accepted Subject to Minor Rectification','Rejected – Further Benchmark Required'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'ajk_rep',label:'AJK Contracts / Design Rep',type:'text',req:true},
      {id:'mpx_pm',label:'MPX Package Manager',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'notes',label:'Additional Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F01',title:'Pre-Installation Checklist',hold:false,qitp:'PRC-06, MC-03, SC-01 to SC-03',freq:'Every Installation',
   desc:'Complete before every cradle & batten installation. Area release, substrate, membrane and material on-site checks.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Apartment / Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'weather',label:'Weather Conditions',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Rep',type:'text',req:true},
    ]},
    {title:'Area Release',num:'02',fields:[
      {id:'area_release',label:'Formal Area Release Received',type:'yn',hint:'MPX Area Release Confirmed',req:true},
      {id:'no_trades',label:'No conflicting trades present',type:'yn',req:true},
      {id:'access_ok',label:'Access & logistics confirmed',type:'yn',hint:'Delivery and access route agreed',req:true},
      {id:'area_comments',label:'Comments',type:'textarea',full:true},{id:'area_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Substrate Inspection',num:'03',fields:[
      {id:'sub_clean',label:'Substrate clean',type:'yn',hint:'Free of debris, laitance, contamination',req:true},
      {id:'no_water',label:'No standing water',type:'yn',req:true},
      {id:'sub_levels',label:'Substrate levels within tolerance',type:'yn',hint:'Falls / build-up achievable for design FFL',req:true},
      {id:'services_ok',label:'Services pressure tested',type:'yn',hint:'Confirmed by others',req:true},
      {id:'perimeter_ok',label:'Perimeter zone clear',type:'yn',hint:'Perimeter gap achievable as specified',req:true},
      {id:'sub_comments',label:'Comments',type:'textarea',full:true},{id:'sub_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Membrane / Acoustic Layer',num:'04',fields:[
      {id:'mem_type',label:'Correct membrane type',type:'yn',req:true},{id:'mem_undamaged',label:'Membrane undamaged',type:'yn',req:true},
      {id:'laps_150',label:'Laps minimum 150mm',type:'yn',req:true},{id:'acoustic_ok',label:'Acoustic layer undamaged (if applicable)',type:'yn'},
      {id:'upstands_ok',label:'Upstands maintained',type:'yn',req:true},
      {id:'mem_comments',label:'Comments',type:'textarea',full:true},{id:'mem_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Materials On Site',num:'05',fields:[
      {id:'cradles_ok',label:'Cradles on site — correct type',type:'yn',hint:'As per approved submittal',req:true},
      {id:'battens_ok',label:'Battens on site — correct species/grade',type:'yn',hint:'Species, grade, MC confirmed',req:true},
      {id:'fixings_ok',label:'Fixings on site — correct specification',type:'yn',hint:'Type, diameter, length confirmed',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Supervisor Declaration',num:'06',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_name',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'overall_status',label:'Overall Form Status',type:'select',opts:['All Items Compliant','Minor Issues Noted — Works May Proceed','HOLD — Do Not Proceed'],req:true,full:true},
      {id:'notes',label:'Additional Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F02',title:'Material & Installation Record',hold:false,qitp:'MC-01, MC-02, MC-04, SC-04, SC-05',freq:'Every Installation',
   desc:'Material traceability and installation record. Cradle centres, fixing centres, batten MC, FFL achieved and SR checks per area.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'weather',label:'Weather',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
      {id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},{id:'submittal_ref',label:'Approved Technical Submittal Ref',type:'text',req:true},
      {id:'supervisor',label:'Installation Supervisor',type:'text',req:true},
    ]},
    {title:'Material Verification',num:'02',fields:[
      {id:'batten_grade',label:'Batten species and grade',type:'yn',hint:'BS 8201 / Approved Submittal',req:true},
      {id:'batten_batch',label:'Batten batch / delivery ref recorded',type:'yn',req:true},
      {id:'cradle_type',label:'Cradle type and batch confirmed',type:'yn',req:true},
      {id:'fixing_spec',label:'Fixing type and specification confirmed',type:'yn',req:true},
      {id:'dpm_ok',label:'DPM / acoustic layer confirmed (if applicable)',type:'yn'},
      {id:'mc_check',label:'Moisture content check (battens)',type:'yn',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Record',num:'03',fields:[{id:'cb_install_rec',label:'Installation Log per Area',type:'cb_install_rec',full:true}]},
    {title:'Non-Conformance Record',num:'04',fields:[{id:'cb_install_nc',label:'Non-Conformances',type:'cb_install_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'walk_ok',label:'Walk test completed — no squeaking or movement',type:'yn',req:true},
      {id:'fixings_flush',label:'All fixings driven flush',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F03',title:'Level Log',hold:false,qitp:'SC-06, TC-01, TC-02',freq:'Every Installation',
   desc:'Level checks during cradle & batten installation. Record per room. Non-conformances must be corrected before proceeding.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'design_ffl',label:'Design FFL',type:'text',req:true},{id:'design_thick',label:'Design Cradle & Batten Thickness',type:'text',req:true},
      {id:'datum_ref',label:'Datum Reference Used',type:'text',req:true},{id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Level Measurement Log',num:'03',fields:[{id:'level_check',label:'Level Measurements',type:'level_check',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'level_nc',label:'Non-Conformance Actions',type:'level_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F04',title:'SR Test Record',hold:true,qitp:'SC-07, TC-01',freq:'On Completion',
   desc:'Surface regularity straightedge testing to BS 8201. HOLD POINT — area must pass SR class before floor finish installation.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'sr_class',label:'Specified SR Class',type:'select',opts:['SR1 (±3mm)','SR2 (±5mm)','SR3 (±10mm)'],req:true},
      {id:'max_dev',label:'Max Permitted Deviation (mm)',type:'number',req:true},{id:'tested_by',label:'Tested By',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_sr_summary',label:'Room Summary',type:'room_sr_summary',full:true}]},
    {title:'Straightedge Test Log',num:'03',fields:[{id:'sr_table',label:'Test Readings',type:'sr_table',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'sr_nc_table',label:'Non-Conformance Actions',type:'sr_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall SR Test Result',type:'select',opts:['PASS — Area Compliant with Specified SR Class','FAIL — Rectification Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F05',title:'Moisture Test Report',hold:true,qitp:'TC-03',freq:'Pre-Finish',
   desc:'Moisture content testing to BS 8203. HOLD POINT — batten MC must be within specified limit before floor finish proceeds.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'install_date',label:'Date Cradle & Batten Installed',type:'date',req:true},
      {id:'age_days',label:'Age of C&B (Days)',type:'number',req:true},
      {id:'mc_limit',label:'Specified MC Limit (%)',type:'number',req:true},{id:'finish_type',label:'Floor Finish Type',type:'text',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},{id:'meter_serial',label:'Moisture Meter Serial No.',type:'text',req:true},
      {id:'calib_ref',label:'Calibration Certificate Ref',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_mc_summary',label:'Room Summary',type:'room_mc_summary',full:true}]},
    {title:'Moisture Content Test Log',num:'03',fields:[{id:'mc_table',label:'MC Test Readings',type:'mc_table',full:true}]},
    {title:'Non-Compliant Results',num:'04',fields:[{id:'mc_nc_table',label:'Non-Compliant Actions',type:'mc_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall Moisture Test Result',type:'select',opts:['PASS — All Areas Within MC Limit','FAIL — Remedial Drying Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F06',title:'Walk Test / Stability Record',hold:false,qitp:'TC-04',freq:'On Completion',
   desc:'Walk test and stability checks. No squeaking, no movement, no rocking cradles. Tests to QITP TC-04.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'install_date',label:'Date C&B Installed',type:'date',req:true},
      {id:'age_days',label:'Age (Days)',type:'number',req:true},
      {id:'cb_cat',label:'Specified C&B Category',type:'select',opts:['A Heavy Duty','B Medium Duty','C Light Duty'],req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_walk_summary',label:'Room Summary',type:'room_walk_summary',full:true}]},
    {title:'Walk Test Log',num:'03',fields:[{id:'walk_table',label:'Walk Test Readings',type:'walk_table',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'walk_nc',label:'Non-Conformance / Remedial Record',type:'walk_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall Walk Test Result',type:'select',opts:['PASS — No Squeaking or Movement','FAIL — Remedial Works Required'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F07',title:'Protection Log',hold:false,qitp:'SC-09, TC-04',freq:'Daily During Protection',
   desc:'Daily monitoring of protection period. Trafficking, batten condition, cradle stability. Complete every day during protection period.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Date C&B Installed',type:'date',req:true},
      {id:'min_protect',label:'Specified Minimum Protection Period',type:'text',req:true},
      {id:'protect_method',label:'Protection Method',type:'text',req:true},
      {id:'release_date',label:'Release Date Eligible',type:'date',req:true},
      {id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Daily Protection Monitoring Log',num:'02',fields:[{id:'protection_daily',label:'Daily Monitoring Records',type:'protection_daily',full:true}]},
    {title:'Premature Loading Check',num:'03',fields:[{id:'premature_check',label:'Premature Loading Records',type:'premature_check',full:true}]},
    {title:'Minimum Protection Confirmation',num:'04',fields:[
      {id:'req_period',label:'Required Minimum Period',type:'text',req:true},{id:'actual_period',label:'Actual Period Achieved',type:'text',req:true},
      {id:'period_compliant',label:'Protection Period Compliant',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F08',title:'Post Installation Inspection',hold:false,qitp:'SC-10, PC-01',freq:'Every Installation',
   desc:'Visual inspection within 24–48 hours of installation. Batten condition, cradle condition, fixings, membrane and level check.',
   sections:[
    {title:'Inspection Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Installation Date',type:'date',req:true},
      {id:'inspection_date',label:'Inspection Date',type:'date',req:true},{id:'hours_since',label:'Hours Since Installation',type:'number',req:true},
      {id:'inspector',label:'Inspector',type:'text',req:true},
      {id:'weather',label:'Weather During Installation',type:'select',opts:['Dry','Cloudy','Light Rain','Heavy Rain','Cold (<5°C)','Hot (>25°C)'],req:true},
    ]},
    {title:'Visual Inspection Checklist',num:'02',fields:[
      {id:'batten_ok',label:'Batten condition — no splits, damage or defects',type:'yn',req:true},
      {id:'cradle_ok',label:'Cradle condition — all stable and undamaged',type:'yn',req:true},
      {id:'fixings_ok',label:'Fixings condition — flush, none missing',type:'yn',req:true},
      {id:'membrane_ok',label:'Membrane integrity (if applicable)',type:'yn'},
      {id:'perimeter_ok',label:'Perimeter gap maintained as specified',type:'yn',req:true},
      {id:'protection_ok',label:'Protection in place — signage and barriers installed',type:'yn',req:true},
      {id:'visual_comments',label:'Comments',type:'textarea',full:true},{id:'visual_photo',label:'Photo References',type:'text',full:true},
    ]},
    {title:'Level Check',num:'03',fields:[{id:'post_level_check',label:'Level Check Records',type:'post_level_check',full:true}]},
    {title:'Defect Log',num:'04',fields:[{id:'defect_table',label:'Defects Identified',type:'defect_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'outcome',label:'Inspection Outcome',type:'select',opts:['Compliant','Requires Remedial Works','Escalated to NCR'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F09',title:'Material Delivery Log',hold:false,qitp:'MC-01, MC-02, MC-03, MC-07, MC-08',freq:'Every Delivery',
   desc:'Log every material delivery. Traceability from delivery to installation area maintained for all battens, cradles and fixings.',
   sections:[
    {title:'Delivery Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'supplier',label:'Supplier',type:'text',req:true},{id:'date',label:'Date',type:'date',req:true},
      {id:'logged_by',label:'Logged By',type:'text',req:true},
    ]},
    {title:'Delivery Log',num:'02',fields:[{id:'delivery_table',label:'Deliveries Received',type:'delivery_table',full:true}]},
    {title:'Batch Allocation to Installation Areas',num:'03',fields:[{id:'batch_alloc',label:'Batch Allocation',type:'batch_alloc',full:true}]},
    {title:'Rejected Materials',num:'04',fields:[{id:'rejected_table',label:'Rejected Materials',type:'rejected_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F10',title:'Calibration Register',hold:false,qitp:'PRC-04, TC-03, TC-04',freq:'Periodic',
   desc:'Equipment calibration register. All moisture meters, straightedges and test equipment must be within certification period.',
   sections:[
    {title:'Register Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'maintained_by',label:'Maintained By',type:'text',req:true},{id:'review_date',label:'Last Review Date',type:'date',req:true},
    ]},
    {title:'Equipment Register',num:'02',fields:[{id:'equip_table',label:'Equipment',type:'equip_table',full:true}]},
    {title:'Out of Calibration Record',num:'03',fields:[{id:'oc_table',label:'Out of Calibration / Quarantine',type:'oc_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'qa_manager',label:'QA Manager',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'all_calibrated',label:'All equipment calibrated and in-date',type:'yn',req:true,full:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F11',title:'QA Pack Index',hold:true,qitp:'TC-05',freq:'On Completion',
   desc:'Confirms all F00–F10 records are complete and signed. All hold points closed. HOLD POINT before Aconex submission.',
   sections:[
    {title:'Pack Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',val:'TVC-AJK-EE-ZZ-QP-X-43010',req:true},
      {id:'install_num',label:'Installation Reference',type:'text',req:true},{id:'block',label:'Block / Plot',type:'text',req:true},
      {id:'level',label:'Level',type:'text',req:true},{id:'completion_date',label:'Date of Completion',type:'date',req:true},
      {id:'compiled_by',label:'Compiled By',type:'text',req:true},
    ]},
    {title:'Inspection Records Checklist',num:'02',fields:[
      {id:'f00_incl',label:'F00 Benchmark Acceptance (if applicable)',type:'yn'},
      {id:'f01_incl',label:'F01 Pre-Installation Checklist',type:'yn',req:true},
      {id:'f02_incl',label:'F02 Material and Installation Record',type:'yn',req:true},
      {id:'f03_incl',label:'F03 Level Log',type:'yn',req:true},
      {id:'f04_incl',label:'F04 SR Test Record (HOLD)',type:'yn',req:true},
      {id:'f05_incl',label:'F05 Moisture Test Report (HOLD)',type:'yn',req:true},
      {id:'f06_incl',label:'F06 Walk Test / Stability Record',type:'yn',req:true},
      {id:'f07_incl',label:'F07 Protection Log',type:'yn',req:true},
      {id:'f08_incl',label:'F08 Post Installation Inspection',type:'yn',req:true},
      {id:'f09_incl',label:'F09 Material Delivery Log',type:'yn',req:true},
      {id:'f10_incl',label:'F10 Calibration Register',type:'yn',req:true},
    ]},
    {title:'Hold Point Confirmation',num:'03',fields:[
      {id:'hp_prc05',label:'PRC-05 Benchmark Accepted',type:'yn',req:true},
      {id:'hp_sc07',label:'SC-07 Surface Regularity Compliant',type:'yn',req:true},
      {id:'hp_tc03',label:'TC-03 Batten MC Within Specification',type:'yn',req:true},
      {id:'hp_tc04',label:'TC-04 Walk Test Completed',type:'yn',req:true},
      {id:'hp_tc05',label:'TC-05 QA Pack Compiled',type:'yn',req:true},
    ]},
    {title:'Material Traceability Confirmation',num:'04',fields:[
      {id:'del_logged',label:'All delivery tickets logged',type:'yn',req:true},
      {id:'batch_trace',label:'Batch numbers traceable to installation area',type:'yn',req:true},
      {id:'dop_incl',label:'DoP / TDS included in pack',type:'yn',req:true},
      {id:'calib_incl',label:'Calibration certificates included',type:'yn',req:true},
      {id:'ncr_incl',label:'NCRs (if any) attached',type:'yn'},
    ]},
    {title:'Submission & Declaration',num:'05',fields:[
      {id:'aconex_mail',label:'Aconex Mail Type',type:'text',req:true},{id:'aconex_ref',label:'Aconex Reference No.',type:'text',req:true},
      {id:'submit_date',label:'Date Submitted',type:'date',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'contracts_mgr',label:'AJK Contracts Manager',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F12',title:'Area Handover Certificate',hold:true,qitp:'Handover',freq:'Final Handover',
   desc:'Formal area release to Multiplex. All QITP tests passed and hold points closed. C&B released for floor finish installation.',
   sections:[
    {title:'Handover Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',val:'TVC-AJK-EE-ZZ-QP-X-43010',req:true},
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'install_nums',label:'Installation Numbers',type:'text',req:true},
      {id:'cb_complete',label:'Date of C&B Completion',type:'date',req:true},
      {id:'handover_date',label:'Date of Handover Inspection',type:'date',req:true},
    ]},
    {title:'Compliance Summary',num:'02',fields:[
      {id:'c_level',label:'F03 — Level Verification FFL Within Tolerance',type:'yn',req:true},
      {id:'c_sr',label:'F04 — Surface Regularity SR Class Achieved',type:'yn',req:true},
      {id:'c_mc',label:'F05 — Batten Moisture Content Within MC Limit',type:'yn',req:true},
      {id:'c_walk',label:'F06 — Walk Test No Squeak or Movement',type:'yn',req:true},
      {id:'c_protect',label:'F07 — Protection Period Achieved',type:'yn',req:true},
      {id:'c_postinstall',label:'F08 — No Unresolved Defects',type:'yn',req:true},
      {id:'c_qapack',label:'F11 — QA Record Pack Submitted via Aconex',type:'yn',req:true},
    ]},
    {title:'Area Condition at Handover',num:'03',fields:[
      {id:'no_contamination',label:'Surface free from contamination',type:'yn',req:true},
      {id:'no_water',label:'No standing water',type:'yn',req:true},
      {id:'no_batten_damage',label:'No visible batten damage',type:'yn',req:true},
      {id:'no_loose_fixings',label:'No loose or missing fixings',type:'yn',req:true},
      {id:'no_loading_damage',label:'No premature loading damage observed',type:'yn',req:true},
      {id:'suitable_finish',label:'Area suitable for floor finish installation',type:'yn',req:true},
    ]},
    {title:'Declaration',num:'04',fields:[
      {id:'outstanding',label:'Outstanding Items',type:'select',opts:['No outstanding defects','Minor snags listed in notes (non-structural)','NCRs raised and closed'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'ajk_qa',label:'AJK QA Manager',type:'text',req:true},
      {id:'mpx_rep',label:'MPX Representative',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'notes',label:'Notes / Snag List',type:'textarea',full:true},
    ]},
  ]},
];
// ═══════════════════════════════════════════════════════
// STATE & SCOPE CONFIG
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// ADDITIONAL TABLE DEFINITIONS — RAF / HW / TILING
// ═══════════════════════════════════════════════════════
const RAF_TABLE_EXTRAS = {
  raf_benchmark_level: {cols:['Room Ref','No. Checks','Min Required','Within Tol Y/N','Comments'],rows:4},
  raf_benchmark_sr:    {cols:['Test Location','Measured Dev (mm)','Permitted Dev (mm)','Within Tol Y/N','Comments'],rows:4},
  raf_install_rec:     {cols:['Area Ref','Ped Height (mm)','Ped Centres (mm)','Panel Type','Panel Locked Y/N','Cut Panels Y/N','SR Check Y/N','Walk Test Y/N','FFL Achieved (mm)','Initials'],rows:6},
  raf_install_nc:      {cols:['Area Ref','Issue','Action Taken','Verified By','Date'],rows:3},
  raf_level_log:       {cols:['Room Ref','Check No.','Location','FFL Actual (mm)','FFL Design (mm)','Void Height (mm)','Min Void OK Y/N','Action?','Initials'],rows:8},
  raf_load_log:        {cols:['Room Ref','Test No.','Location','Point Load (kN)','UDL (kN/m²)','Deflection (mm)','Max Deflection OK Y/N','Pass/Fail','Initials'],rows:6},
  raf_load_nc:         {cols:['Room Ref','Test No.','Failure Mode','Remedial Action','Re-Test Result','Verified By','Date'],rows:3},
  raf_walk_log:        {cols:['Room Ref','Panel Ref','Location','Rocking Y/N','Rattling Y/N','Deflection >3mm Y/N','Locked Y/N','Pass/Fail','Action?','Initials'],rows:8},
};

const HW_TABLE_EXTRAS = {
  hw_install_rec:     {cols:['Room Ref','Board Species','Batch No.','MC at Laying (%)','Laying Direction','Fix Method','Exp Gap (mm)','SR Check Y/N','Walk Test Y/N','Initials'],rows:6},
  hw_install_nc:      {cols:['Room Ref','Issue','Action Taken','Verified By','Date'],rows:3},
  hw_sr_table:        {cols:['Room Ref','Test No.','Location','SR Dev (mm)','Lippage (mm)','SR OK Y/N','Lippage OK Y/N','Action?','Initials'],rows:8},
  hw_sanding_rec:     {cols:['Room Ref','Date','Grit No.','Pass No.','Direction','Machine Used','Operator','Acceptable Y/N','Comments'],rows:6},
  hw_finish_rec:      {cols:['Room Ref','Date','Coat No.','Product / Batch','Coverage (m²/L)','Amb Temp (°C)','RH (%)','Cure Time (hrs)','Initials'],rows:5},
  hw_protection_log:  {cols:['Date','Day No.','Amb Temp (°C)','RH (%)','Trafficked Y/N','Board Condition','Protection Intact Y/N','Initials'],rows:14},
};

const TILING_TABLE_EXTRAS = {
  tiling_install_rec:  {cols:['Area Ref','Tile Batch','Shade Batch','Adhesive Batch','Coverage ≥80% Y/N','Joint Width (mm)','Lippage (mm)','Movement Joints Y/N','Grouted Y/N','Initials'],rows:6},
  tiling_install_nc:   {cols:['Area Ref','Issue','Action Taken','Verified By','Date'],rows:3},
  tiling_level_log:    {cols:['Room Ref','Check No.','Location','FFL Actual (mm)','FFL Design (mm)','Lippage (mm)','FFL OK Y/N','Lippage OK Y/N','Action?','Initials'],rows:8},
  tiling_sr_log:       {cols:['Room Ref','Test No.','Location','SR Dev (mm)','Lippage (mm)','SR OK Y/N','Lippage OK Y/N','Action?','Initials'],rows:8},
  tiling_bond_log:     {cols:['Room Ref','Test No.','Location','Bond Str (N/mm²)','Min Required','Pass/Fail','Failure Mode','Initials'],rows:6},
  tiling_bond_nc:      {cols:['Room Ref','Test No.','Bond Str','Failure Mode','Action Taken','Re-Test Result','Verified By','Date'],rows:3},
  grout_rec:           {cols:['Area Ref','Date','Grout Product','Batch No.','Colour','W:P Ratio','Coverage (m²)','Cure Temp (°C)','Joints Full Y/N','Initials'],rows:5},
  movement_joint_rec:  {cols:['Location Description','Type (Structural/Perimeter/Bay)','Width (mm)','Sealant Product','Batch No.','Colour Match Y/N','Installed Y/N','Initials'],rows:6},
};

// ═══════════════════════════════════════════════════════
// RAISED ACCESS FLOOR FORMS (F00–F12)
// Standards: BS EN 12825, BS 6399-1, PSA MOB PF2 PS/SPU
// ═══════════════════════════════════════════════════════
const RAF_FORMS = [
  {id:'F00',title:'Benchmark Acceptance',hold:true,qitp:'PRC-05',freq:'First Install Only',
   desc:'Benchmark panel and pedestal installation. Load class, level, SR and walk test accepted as project standard before production installation.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
    ]},
    {title:'Material Confirmation',num:'02',fields:[
      {id:'panel_type',label:'Panel type and load class confirmed',type:'yn',hint:'BS EN 12825 Class A–F / Approved submittal',req:true},
      {id:'ped_type',label:'Pedestal type and load rating confirmed',type:'yn',hint:'As per approved submittal',req:true},
      {id:'stringer_ok',label:'Stringer / cable management confirmed (if applicable)',type:'yn'},
      {id:'finish_ok',label:'Panel finish type confirmed',type:'yn',hint:'Approved submittal',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Verification',num:'03',fields:[
      {id:'substrate_prep',label:'Substrate prepared per F01',type:'yn',req:true},
      {id:'ped_spacing',label:'Pedestal spacing matches approved drawings',type:'yn',req:true},
      {id:'ped_fixed',label:'Pedestal base plates fixed and torqued',type:'yn',req:true},
      {id:'panel_seated',label:'Panels correctly seated and locked',type:'yn',req:true},
      {id:'cut_supported',label:'Cut panels supported on additional pedestals',type:'yn',req:true},
      {id:'access_ok',label:'Access panel locations correct',type:'yn'},
      {id:'install_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Level & SR Compliance',num:'04',fields:[
      {id:'design_ffl',label:'Design FFL',type:'text',req:true},{id:'nominal_void',label:'Nominal Void Height (mm)',type:'number',req:true},
      {id:'datum_ref',label:'Datum Reference',type:'text',req:true},
      {id:'raf_benchmark_level',label:'Level Check Summary',type:'raf_benchmark_level',full:true},
      {id:'sr_class',label:'Specified SR Class',type:'select',opts:['SR1 (±3mm)','SR2 (±5mm)','SR3 (±10mm)'],req:true},
      {id:'raf_benchmark_sr',label:'SR Test Summary',type:'raf_benchmark_sr',full:true},
    ]},
    {title:'Load & Walk Test',num:'05',fields:[
      {id:'load_class',label:'Specified Load Class (BS EN 12825)',type:'select',opts:['Class 1 (1.5 kN/m²)','Class 2 (2.0 kN/m²)','Class 3 (3.0 kN/m²)','Class 4 (4.5 kN/m²)','Class 5 (7.5 kN/m²)','Class 6 (12.0 kN/m²)'],req:true,full:true},
      {id:'load_test_ok',label:'Load test passed for specified class',type:'yn',req:true},
      {id:'walk_test_ok',label:'Walk test — no rocking, rattling or deflection >3mm',type:'yn',req:true},
      {id:'test_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Declaration',num:'06',fields:[
      {id:'outcome',label:'Benchmark Outcome',type:'select',opts:['Accepted – Production Installs May Proceed','Accepted Subject to Minor Rectification','Rejected – Further Benchmark Required'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_pm',label:'MPX Package Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F01',title:'Pre-Installation Checklist',hold:false,qitp:'PRC-06, SC-01 to SC-03',freq:'Every Installation',
   desc:'Complete before every RAF installation. Substrate integrity, underfloor services sign-off, area release and material checks.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Rep',type:'text',req:true},
    ]},
    {title:'Area Release',num:'02',fields:[
      {id:'area_release',label:'Formal Area Release Received',type:'yn',req:true},
      {id:'no_trades',label:'No conflicting trades present',type:'yn',req:true},
      {id:'services_clear',label:'Underfloor services installed and signed off by M&E',type:'yn',req:true},
      {id:'access_ok',label:'Access and logistics confirmed',type:'yn',req:true},
      {id:'area_comments',label:'Comments',type:'textarea',full:true},{id:'area_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Substrate Inspection',num:'03',fields:[
      {id:'sub_clean',label:'Substrate clean and free of debris',type:'yn',req:true},
      {id:'no_damp',label:'No dampness or standing water',type:'yn',req:true},
      {id:'sub_level',label:'Substrate levels within tolerance for void height',type:'yn',req:true},
      {id:'sub_strength',label:'Substrate structural capacity confirmed',type:'yn',hint:'BS 6399-1 / structural engineer confirmation',req:true},
      {id:'dpc_ok',label:'DPC / vapour barrier in place (if specified)',type:'yn'},
      {id:'sub_comments',label:'Comments',type:'textarea',full:true},{id:'sub_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Materials On Site',num:'04',fields:[
      {id:'panels_ok',label:'Panels on site — correct type / load class',type:'yn',req:true},
      {id:'peds_ok',label:'Pedestals on site — correct type / height range',type:'yn',req:true},
      {id:'stringers_ok',label:'Stringers on site (if applicable)',type:'yn'},
      {id:'edge_trims_ok',label:'Edge trims and ramps on site (if applicable)',type:'yn'},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Supervisor Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_name',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'overall_status',label:'Overall Form Status',type:'select',opts:['All Items Compliant','Minor Issues Noted — Works May Proceed','HOLD — Do Not Proceed'],req:true,full:true},
      {id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F02',title:'Material & Installation Record',hold:false,qitp:'MC-01, SC-04, SC-05',freq:'Every Installation',
   desc:'Panel, pedestal and stringer installation record. Heights, seating, SR checks and batch traceability per area.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Install Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'submittal_ref',label:'Approved Technical Submittal Ref',type:'text',req:true},
      {id:'supervisor',label:'Installation Supervisor',type:'text',req:true},
    ]},
    {title:'Material Verification',num:'02',fields:[
      {id:'panel_batch',label:'Panel batch / delivery ref recorded',type:'yn',req:true},
      {id:'panel_class_ok',label:'Panel load class matches specification',type:'yn',hint:'BS EN 12825',req:true},
      {id:'ped_batch',label:'Pedestal batch recorded',type:'yn',req:true},
      {id:'ped_load_ok',label:'Pedestal load rating confirmed',type:'yn',req:true},
      {id:'finish_match',label:'Panel finish matches approved submittal',type:'yn',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Record',num:'03',fields:[{id:'raf_install_rec',label:'Installation Log per Area',type:'raf_install_rec',full:true}]},
    {title:'Non-Conformance Record',num:'04',fields:[{id:'raf_install_nc',label:'Non-Conformances',type:'raf_install_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'all_locked',label:'All panels correctly seated and locked',type:'yn',req:true},
      {id:'cut_supported',label:'All cut panels supported on extra pedestals',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F03',title:'Level & Void Height Log',hold:false,qitp:'SC-06, TC-01',freq:'Every Installation',
   desc:'FFL and void height checks throughout installation. Pedestal adjustments and level compliance recorded per room. Ref BS EN 12825.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Install Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'design_ffl',label:'Design FFL',type:'text',req:true},{id:'nominal_void',label:'Nominal Void Height (mm)',type:'number',req:true},
      {id:'min_void',label:'Min. Permitted Void Height (mm)',type:'number',req:true},
      {id:'datum_ref',label:'Datum Reference',type:'text',req:true},{id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Level & Void Height Log',num:'03',fields:[{id:'raf_level_log',label:'Level Measurements',type:'raf_level_log',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'level_nc',label:'Non-Conformance Actions',type:'level_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F04',title:'SR Test Record',hold:true,qitp:'TC-02',freq:'On Completion',
   desc:'Surface regularity straightedge testing to BS EN 12825. HOLD POINT — area must pass SR class before floor finish or occupation.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'sr_class',label:'Specified SR Class',type:'select',opts:['SR1 (±3mm)','SR2 (±5mm)','SR3 (±10mm)'],req:true},
      {id:'max_dev',label:'Max Permitted Deviation (mm)',type:'number',req:true},
      {id:'load_class',label:'Panel Load Class',type:'text',req:true},{id:'tested_by',label:'Tested By',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_sr_summary',label:'Room Summary',type:'room_sr_summary',full:true}]},
    {title:'Straightedge Test Log',num:'03',fields:[{id:'sr_table',label:'Test Readings',type:'sr_table',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'sr_nc_table',label:'Non-Conformance Actions',type:'sr_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall SR Test Result',type:'select',opts:['PASS — Area Compliant with Specified SR Class','FAIL — Rectification Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F05',title:'Load Test Record',hold:true,qitp:'TC-03',freq:'On Completion',
   desc:'Point load and UDL testing to BS EN 12825. HOLD POINT — floor must pass specified load class before handover to principal contractor.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'load_class',label:'Specified Load Class',type:'select',opts:['Class 1 (1.5 kN/m²)','Class 2 (2.0 kN/m²)','Class 3 (3.0 kN/m²)','Class 4 (4.5 kN/m²)','Class 5 (7.5 kN/m²)','Class 6 (12.0 kN/m²)'],req:true,full:true},
      {id:'point_load',label:'Specified Point Load (kN)',type:'number',req:true},
      {id:'udl',label:'Specified UDL (kN/m²)',type:'number',req:true},
      {id:'max_deflect',label:'Max Permitted Deflection (mm)',type:'number',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},{id:'equip_ref',label:'Test Equipment Reference',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Load Test Log',num:'03',fields:[{id:'raf_load_log',label:'Load Test Readings',type:'raf_load_log',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'raf_load_nc',label:'Non-Conformance Actions',type:'raf_load_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall Load Test Result',type:'select',opts:['PASS — All Areas Meet Specified Load Class','FAIL — Remedial Works Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F06',title:'Panel Integrity & Walk Test',hold:false,qitp:'TC-04',freq:'On Completion',
   desc:'Panel seating, locking, deflection and audible walk test to BS EN 12825. No rocking, rattling or excessive deflection permitted.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'install_date',label:'Date Installed',type:'date',req:true},{id:'tested_by',label:'Tested By',type:'text',req:true},
      {id:'load_class',label:'Panel Load Class',type:'text',req:true},{id:'max_deflect',label:'Max Permitted Deflection (mm)',type:'number',req:true,hint:'Typically 3mm under point load'},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_walk_summary',label:'Room Summary',type:'room_walk_summary',full:true}]},
    {title:'Walk Test Log',num:'03',fields:[{id:'raf_walk_log',label:'Panel Integrity & Walk Test Records',type:'raf_walk_log',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'walk_nc',label:'Non-Conformance / Remedial Record',type:'walk_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall Walk Test Result',type:'select',opts:['PASS — No Rocking, Rattling or Excessive Deflection','FAIL — Remedial Works Required'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F07',title:'Protection Log',hold:false,qitp:'SC-09',freq:'Daily During Protection',
   desc:'Daily monitoring during protection period. Trafficking, panel condition and protection integrity recorded.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Date Installed',type:'date',req:true},
      {id:'protect_method',label:'Protection Method',type:'text',req:true},{id:'release_date',label:'Release Date Eligible',type:'date',req:true},
      {id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Daily Protection Log',num:'02',fields:[{id:'protection_daily',label:'Daily Monitoring Records',type:'protection_daily',full:true}]},
    {title:'Premature Loading Check',num:'03',fields:[{id:'premature_check',label:'Premature Loading Records',type:'premature_check',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'period_compliant',label:'Protection Period Compliant',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F08',title:'Post Installation Inspection',hold:false,qitp:'SC-10, PC-01',freq:'Every Installation',
   desc:'Post-installation visual inspection. Panel condition, pedestal stability, edge trims, access panels and defect log.',
   sections:[
    {title:'Inspection Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Installation Date',type:'date',req:true},
      {id:'inspection_date',label:'Inspection Date',type:'date',req:true},{id:'inspector',label:'Inspector',type:'text',req:true},
    ]},
    {title:'Visual Inspection Checklist',num:'02',fields:[
      {id:'panels_undamaged',label:'Panel surfaces clean and undamaged',type:'yn',req:true},
      {id:'panels_seated',label:'All panels correctly seated — no proud edges',type:'yn',req:true},
      {id:'panels_locked',label:'All panels locked / secured',type:'yn',req:true},
      {id:'peds_stable',label:'All pedestals stable — no rocking',type:'yn',req:true},
      {id:'edge_trims_ok',label:'Edge trims correctly installed',type:'yn'},
      {id:'access_ok',label:'Access panels operational and correctly located',type:'yn'},
      {id:'void_clear',label:'Underfloor void clear of debris',type:'yn',req:true},
      {id:'protection_ok',label:'Protection and signage in place',type:'yn',req:true},
      {id:'visual_comments',label:'Comments',type:'textarea',full:true},{id:'visual_photo',label:'Photo References',type:'text',full:true},
    ]},
    {title:'Defect Log',num:'03',fields:[{id:'defect_table',label:'Defects Identified',type:'defect_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'outcome',label:'Inspection Outcome',type:'select',opts:['Compliant','Requires Remedial Works','Escalated to NCR'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F09',title:'Material Delivery Log',hold:false,qitp:'MC-01 to MC-05',freq:'Every Delivery',
   desc:'Log all panel, pedestal, stringer and accessory deliveries. DoP/TDS confirmation, batch traceability and storage records.',
   sections:[
    {title:'Delivery Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'supplier',label:'Supplier',type:'text',req:true},{id:'date',label:'Date',type:'date',req:true},
      {id:'logged_by',label:'Logged By',type:'text',req:true},
    ]},
    {title:'Delivery Log',num:'02',fields:[{id:'delivery_table',label:'Deliveries Received',type:'delivery_table',full:true}]},
    {title:'Batch Allocation',num:'03',fields:[{id:'batch_alloc',label:'Batch Allocation to Installation Areas',type:'batch_alloc',full:true}]},
    {title:'Rejected Materials',num:'04',fields:[{id:'rejected_table',label:'Rejected Materials',type:'rejected_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F10',title:'Calibration Register',hold:false,qitp:'PRC-04, TC-02, TC-03',freq:'Periodic',
   desc:'Calibration register for levels, straightedges, load test equipment and all measurement instruments used in RAF installation.',
   sections:[
    {title:'Register Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'maintained_by',label:'Maintained By',type:'text',req:true},{id:'review_date',label:'Last Review Date',type:'date',req:true},
    ]},
    {title:'Equipment Register',num:'02',fields:[{id:'equip_table',label:'Equipment',type:'equip_table',full:true}]},
    {title:'Out of Calibration Record',num:'03',fields:[{id:'oc_table',label:'Out of Calibration / Quarantine',type:'oc_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'qa_manager',label:'QA Manager',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'all_calibrated',label:'All equipment calibrated and in-date',type:'yn',req:true,full:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F11',title:'QA Pack Index',hold:true,qitp:'TC-05',freq:'On Completion',
   desc:'Confirms all F00–F10 records complete and signed. All hold points closed. HOLD POINT before Aconex submission.',
   sections:[
    {title:'Pack Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',req:true},
      {id:'install_num',label:'Installation Reference',type:'text',req:true},{id:'block',label:'Block / Plot',type:'text',req:true},
      {id:'level',label:'Level',type:'text',req:true},{id:'completion_date',label:'Date of Completion',type:'date',req:true},
      {id:'compiled_by',label:'Compiled By',type:'text',req:true},
    ]},
    {title:'Inspection Records Checklist',num:'02',fields:[
      {id:'f00_incl',label:'F00 Benchmark Acceptance (if applicable)',type:'yn'},
      {id:'f01_incl',label:'F01 Pre-Installation Checklist',type:'yn',req:true},
      {id:'f02_incl',label:'F02 Material and Installation Record',type:'yn',req:true},
      {id:'f03_incl',label:'F03 Level and Void Height Log',type:'yn',req:true},
      {id:'f04_incl',label:'F04 SR Test Record (HOLD)',type:'yn',req:true},
      {id:'f05_incl',label:'F05 Load Test Record (HOLD)',type:'yn',req:true},
      {id:'f06_incl',label:'F06 Panel Integrity and Walk Test',type:'yn',req:true},
      {id:'f07_incl',label:'F07 Protection Log',type:'yn',req:true},
      {id:'f08_incl',label:'F08 Post Installation Inspection',type:'yn',req:true},
      {id:'f09_incl',label:'F09 Material Delivery Log',type:'yn',req:true},
      {id:'f10_incl',label:'F10 Calibration Register',type:'yn',req:true},
    ]},
    {title:'Hold Point Confirmation',num:'03',fields:[
      {id:'hp_benchmark',label:'Benchmark Accepted (F00)',type:'yn',req:true},
      {id:'hp_sr',label:'SR Test Compliant (F04)',type:'yn',req:true},
      {id:'hp_load',label:'Load Test Passed (F05)',type:'yn',req:true},
      {id:'hp_qapack',label:'QA Pack Compiled (F11)',type:'yn',req:true},
    ]},
    {title:'Submission & Declaration',num:'04',fields:[
      {id:'aconex_mail',label:'Aconex Mail Type',type:'text',req:true},{id:'aconex_ref',label:'Aconex Reference No.',type:'text',req:true},
      {id:'submit_date',label:'Date Submitted',type:'date',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'contracts_mgr',label:'AJK Contracts Manager',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F12',title:'Area Handover Certificate',hold:true,qitp:'Handover',freq:'Final Handover',
   desc:'Formal area release to Multiplex. All QITP tests passed and hold points closed. RAF released for occupation or finish works.',
   sections:[
    {title:'Handover Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',req:true},
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'install_nums',label:'Installation Numbers',type:'text',req:true},
      {id:'install_complete',label:'Date of RAF Completion',type:'date',req:true},
      {id:'handover_date',label:'Date of Handover Inspection',type:'date',req:true},
    ]},
    {title:'Compliance Summary',num:'02',fields:[
      {id:'c_level',label:'F03 — Level / Void Height Within Tolerance',type:'yn',req:true},
      {id:'c_sr',label:'F04 — SR Class Achieved',type:'yn',req:true},
      {id:'c_load',label:'F05 — Load Class Test Passed',type:'yn',req:true},
      {id:'c_walk',label:'F06 — Panel Integrity Walk Test Passed',type:'yn',req:true},
      {id:'c_protect',label:'F07 — Protection Period Achieved',type:'yn',req:true},
      {id:'c_postinstall',label:'F08 — No Unresolved Defects',type:'yn',req:true},
      {id:'c_qapack',label:'F11 — QA Pack Submitted via Aconex',type:'yn',req:true},
    ]},
    {title:'Area Condition at Handover',num:'03',fields:[
      {id:'panels_clean',label:'Panel surfaces clean and undamaged',type:'yn',req:true},
      {id:'panels_seated',label:'All panels correctly seated and locked',type:'yn',req:true},
      {id:'access_clear',label:'Access panels operational',type:'yn'},
      {id:'void_clear',label:'Underfloor void clear of debris',type:'yn',req:true},
      {id:'no_loading_dmg',label:'No premature loading damage',type:'yn',req:true},
      {id:'suitable_use',label:'Area suitable for intended use / finish works',type:'yn',req:true},
    ]},
    {title:'Declaration',num:'04',fields:[
      {id:'outstanding',label:'Outstanding Items',type:'select',opts:['No outstanding defects','Minor snags listed in notes (non-structural)','NCRs raised and closed'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'ajk_qa',label:'AJK QA Manager',type:'text',req:true},
      {id:'mpx_rep',label:'MPX Representative',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'notes',label:'Notes / Snag List',type:'textarea',full:true},
    ]},
  ]},
];

// ═══════════════════════════════════════════════════════
// HARDWOOD FLOORING FORMS (F00–F12)
// Standards: BS 8201, BS EN 13226/13227, BS EN 13489
// ═══════════════════════════════════════════════════════
const HW_FORMS = [
  {id:'F00',title:'Benchmark Acceptance',hold:true,qitp:'PRC-05',freq:'First Install Only',
   desc:'Benchmark board installation. Species, grade, fixing method, acclimatisation, finish and appearance accepted as project standard.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},{id:'rh_percent',label:'Ambient RH (%)',type:'number',req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
    ]},
    {title:'Material Confirmation',num:'02',fields:[
      {id:'species_ok',label:'Species and grade match approved submittal',type:'yn',hint:'BS EN 13226 / BS EN 13227 / Approved submittal',req:true},
      {id:'mc_range',label:'Board MC within acclimatisation target range',type:'yn',hint:'Target 8–12% MC — BS 8201',req:true},
      {id:'finish_ok',label:'Surface finish / coating confirmed',type:'yn',hint:'Approved TDS / VOC compliance per specification',req:true},
      {id:'adhesive_ok',label:'Adhesive type and class confirmed',type:'yn',hint:'BS EN 14293 / approved TDS'},
      {id:'underlay_ok',label:'Underlay / acoustic mat confirmed (if applicable)',type:'yn'},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Substrate Acceptance',num:'03',fields:[
      {id:'sub_rh',label:'Substrate RH within adhesive limit',type:'yn',hint:'Typically ≤75% RH / BS 8203',req:true},
      {id:'sub_sr',label:'Substrate SR within tolerance',type:'yn',hint:'SR2 or better — BS 8201',req:true},
      {id:'sub_clean',label:'Substrate clean and primed (if required)',type:'yn',req:true},
      {id:'sub_mc_ok',label:'Substrate MC within limit',type:'yn',hint:'≤5% MC for sand/cement screed',req:true},
      {id:'sub_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Method Verification',num:'04',fields:[
      {id:'laying_pattern',label:'Laying pattern as per approved drawings',type:'yn',req:true},
      {id:'expansion_ok',label:'Expansion gaps maintained at perimeter and fixed objects',type:'yn',hint:'Typically 10–15mm / BS 8201',req:true},
      {id:'fixing_method',label:'Fixing method correct — adhesive / secret nail / float',type:'yn',req:true},
      {id:'stagger_ok',label:'Board end-joint stagger meets minimum requirement',type:'yn',hint:'Min 300mm stagger / BS 8201',req:true},
      {id:'install_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Appearance & Walk Test',num:'05',fields:[
      {id:'finish_uniform',label:'Finish uniform — no sanding marks or sheen variation',type:'yn',req:true},
      {id:'no_gaps',label:'No unacceptable gaps between boards',type:'yn',hint:'BS 8201 tolerance',req:true},
      {id:'colour_ok',label:'Colour and grain consistent with approved sample board',type:'yn',req:true},
      {id:'walk_test',label:'Walk test — no squeaking or board movement',type:'yn',req:true},
      {id:'bench_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Declaration',num:'06',fields:[
      {id:'outcome',label:'Benchmark Outcome',type:'select',opts:['Accepted – Production Installs May Proceed','Accepted Subject to Minor Rectification','Rejected – Further Benchmark Required'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_pm',label:'MPX Package Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F01',title:'Pre-Installation Checklist',hold:false,qitp:'PRC-06, SC-01 to SC-03',freq:'Every Installation',
   desc:'Complete before every hardwood installation. Substrate MC/RH, acclimatisation period, area climate stability and material checks.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Apartment / Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},{id:'rh_ambient',label:'Ambient RH (%)',type:'number',req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Rep',type:'text',req:true},
    ]},
    {title:'Area Release & Climate',num:'02',fields:[
      {id:'area_release',label:'Formal Area Release Received',type:'yn',req:true},
      {id:'no_wet_trades',label:'No wet trades or moisture-generating works present',type:'yn',hint:'Area closed to wet works — BS 8201',req:true},
      {id:'hvac_stable',label:'HVAC / climate control at operational settings',type:'yn',hint:'Stable ambient conditions for acclimatisation',req:true},
      {id:'access_ok',label:'Access and logistics confirmed',type:'yn',req:true},
      {id:'area_comments',label:'Comments',type:'textarea',full:true},{id:'area_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Substrate Inspection',num:'03',fields:[
      {id:'sub_clean',label:'Substrate clean and free of contamination',type:'yn',req:true},
      {id:'sub_rh_ok',label:'Substrate RH within adhesive TDS limit',type:'yn',hint:'≤75% RH — BS 8203 / adhesive TDS',req:true},
      {id:'sub_mc_ok',label:'Substrate MC within limit',type:'yn',hint:'≤5% MC for sand/cement screed',req:true},
      {id:'sub_sr_ok',label:'Substrate SR within tolerance for hardwood',type:'yn',hint:'SR2 or better — BS 8201',req:true},
      {id:'sub_primed',label:'Substrate primed as required by adhesive TDS',type:'yn'},
      {id:'sub_comments',label:'Comments',type:'textarea',full:true},{id:'sub_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Acclimatisation Check',num:'04',fields:[
      {id:'acclim_period',label:'Minimum acclimatisation period achieved',type:'yn',hint:'Min 48–72 hrs in situ at operational conditions — BS 8201',req:true},
      {id:'board_mc_ok',label:'Board MC within target range',type:'yn',hint:'Target 8–12% MC',req:true},
      {id:'measured_mc',label:'Measured Board MC (%)',type:'number',req:true},
      {id:'acclim_temp',label:'Acclimatisation Ambient Temp (°C)',type:'number',req:true},
      {id:'acclim_rh',label:'Acclimatisation Ambient RH (%)',type:'number',req:true},
      {id:'acclim_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Materials On Site',num:'05',fields:[
      {id:'boards_ok',label:'Boards on site — correct species / grade / batch',type:'yn',req:true},
      {id:'adhesive_ok',label:'Adhesive on site — correct type / in-date',type:'yn',req:true},
      {id:'underlay_ok',label:'Underlay on site (if applicable)',type:'yn'},
      {id:'fixings_ok',label:'Secret nails / staples on site (if applicable)',type:'yn'},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Supervisor Declaration',num:'06',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_name',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'overall_status',label:'Overall Form Status',type:'select',opts:['All Items Compliant','Minor Issues Noted — Works May Proceed','HOLD — Do Not Proceed'],req:true,full:true},
      {id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F02',title:'Installation Record',hold:false,qitp:'SC-04, SC-05, MC-01',freq:'Every Installation',
   desc:'Board installation record. Laying direction, expansion gaps, board MC at point of laying, adhesive coverage and fixing method per room.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Install Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'submittal_ref',label:'Approved Technical Submittal Ref',type:'text',req:true},
      {id:'supervisor',label:'Installation Supervisor',type:'text',req:true},
    ]},
    {title:'Material Verification',num:'02',fields:[
      {id:'species_batch',label:'Species / batch / delivery ref recorded',type:'yn',req:true},
      {id:'grade_match',label:'Grade and finish match approved submittal',type:'yn',req:true},
      {id:'adhesive_batch',label:'Adhesive batch and expiry date recorded',type:'yn',req:true},
      {id:'mc_recorded',label:'Board MC recorded at point of laying',type:'yn',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Record',num:'03',fields:[{id:'hw_install_rec',label:'Installation Log per Room',type:'hw_install_rec',full:true}]},
    {title:'Non-Conformance Record',num:'04',fields:[{id:'hw_install_nc',label:'Non-Conformances',type:'hw_install_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'gaps_ok',label:'All perimeter and fixed-object expansion gaps maintained',type:'yn',req:true},
      {id:'adhesive_cov',label:'Adhesive coverage ≥80% confirmed throughout',type:'yn',hint:'BS EN 14293 / adhesive TDS',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F03',title:'Level & Lippage Log',hold:false,qitp:'SC-06, TC-01',freq:'Every Installation',
   desc:'FFL and board-to-board lippage checks. Level compliance and lippage between adjacent boards recorded per room. Ref BS 8201.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Install Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'design_ffl',label:'Design FFL',type:'text',req:true},
      {id:'max_lippage',label:'Max Permitted Lippage (mm)',type:'number',req:true,hint:'Typically 1mm BS 8201 / confirm per spec'},
      {id:'datum_ref',label:'Datum Reference',type:'text',req:true},{id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Level & Lippage Log',num:'03',fields:[{id:'level_check',label:'Level and Lippage Measurements',type:'level_check',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'level_nc',label:'Non-Conformance Actions',type:'level_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F04',title:'SR Test Record',hold:true,qitp:'TC-02',freq:'Post-Installation',
   desc:'Surface regularity straightedge testing to BS 8201. HOLD POINT — floor must meet SR class and lippage limits before sanding / finishing commences.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'sr_class',label:'Specified SR Class',type:'select',opts:['SR1 (±3mm)','SR2 (±5mm)','SR3 (±10mm)'],req:true},
      {id:'max_dev',label:'Max Permitted SR Deviation (mm)',type:'number',req:true},
      {id:'max_lippage',label:'Max Permitted Lippage (mm)',type:'number',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_sr_summary',label:'Room Summary',type:'room_sr_summary',full:true}]},
    {title:'SR & Lippage Test Log',num:'03',fields:[{id:'hw_sr_table',label:'Test Readings',type:'hw_sr_table',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'sr_nc_table',label:'Non-Conformance Actions',type:'sr_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall SR Test Result',type:'select',opts:['PASS — Compliant with SR Class and Lippage Limits','FAIL — Rectification Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F05',title:'Moisture Content Test Report',hold:true,qitp:'TC-03',freq:'Pre-Sanding / Pre-Finish',
   desc:'Board MC testing before sanding and finish coats. HOLD POINT — MC must be stable and within target range before any sanding or finishing works begin.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'install_date',label:'Date Flooring Installed',type:'date',req:true},
      {id:'age_days',label:'Age Since Installation (Days)',type:'number',req:true},
      {id:'target_mc',label:'Target Board MC (%)',type:'number',req:true,hint:'Target 8–12% / confirm per species and finish TDS'},
      {id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},{id:'rh_ambient',label:'Ambient RH (%)',type:'number',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},{id:'meter_serial',label:'Moisture Meter Serial No.',type:'text',req:true},
      {id:'calib_ref',label:'Calibration Certificate Ref',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_mc_summary',label:'Room Summary',type:'room_mc_summary',full:true}]},
    {title:'MC Test Log',num:'03',fields:[{id:'mc_table',label:'MC Test Readings',type:'mc_table',full:true}]},
    {title:'Non-Compliant Results',num:'04',fields:[{id:'mc_nc_table',label:'Non-Compliant Actions',type:'mc_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall MC Test Result',type:'select',opts:['PASS — Board MC Stable and Within Target Range','FAIL — Further Conditioning Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F06',title:'Sanding & Finishing Record',hold:false,qitp:'TC-04',freq:'Per Sanding Cycle',
   desc:'Sanding grit progression, finish coat sequence, cure times and ambient conditions recorded per room. Finish system verified against approved TDS.',
   sections:[
    {title:'Room Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'date',label:'Date',type:'date',req:true},
      {id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},{id:'rh_ambient',label:'Ambient RH (%)',type:'number',req:true},
      {id:'finish_system',label:'Approved Finish System / Product',type:'text',req:true},{id:'operator',label:'Operator',type:'text',req:true},
    ]},
    {title:'Sanding Record',num:'02',fields:[{id:'hw_sanding_rec',label:'Sanding Log',type:'hw_sanding_rec',full:true}]},
    {title:'Finish Coat Application Record',num:'03',fields:[{id:'hw_finish_rec',label:'Finish Application Log',type:'hw_finish_rec',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'appearance_ok',label:'Final appearance uniform and as per approved benchmark',type:'yn',req:true},
      {id:'cure_ok',label:'Final coat fully cured per TDS before light trafficking',type:'yn',req:true},
      {id:'no_marks',label:'No sanding marks, sheen variation or finish defects',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F07',title:'Protection Log',hold:false,qitp:'SC-09',freq:'Daily During Protection',
   desc:'Daily monitoring during protection period. Trafficking, finish cure status, ambient conditions and protection integrity recorded.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Date Installed',type:'date',req:true},
      {id:'protect_method',label:'Protection Method',type:'text',req:true},{id:'min_protect',label:'Min. Protection Period',type:'text',req:true},
      {id:'release_date',label:'Release Date Eligible',type:'date',req:true},{id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Daily Protection Log',num:'02',fields:[{id:'hw_protection_log',label:'Daily Monitoring Records',type:'hw_protection_log',full:true}]},
    {title:'Declaration',num:'03',fields:[
      {id:'period_compliant',label:'Protection Period Compliant',type:'yn',req:true},
      {id:'finish_cured',label:'Finish coat fully cured before protection removal',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F08',title:'Post Installation Inspection',hold:false,qitp:'SC-10, PC-01',freq:'Every Installation',
   desc:'Post-installation visual inspection. Board condition, gaps, finish uniformity, lippage and defect log.',
   sections:[
    {title:'Inspection Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Installation Date',type:'date',req:true},
      {id:'inspection_date',label:'Inspection Date',type:'date',req:true},{id:'inspector',label:'Inspector',type:'text',req:true},
    ]},
    {title:'Visual Inspection Checklist',num:'02',fields:[
      {id:'boards_undamaged',label:'Board surfaces clean and undamaged',type:'yn',req:true},
      {id:'no_gaps',label:'No unacceptable gaps between boards',type:'yn',hint:'BS 8201 tolerance',req:true},
      {id:'lippage_ok',label:'Lippage within permitted tolerance',type:'yn',req:true},
      {id:'expansion_ok',label:'Expansion gaps maintained and covered by trims',type:'yn',req:true},
      {id:'finish_uniform',label:'Finish uniform — no sanding marks or sheen variation',type:'yn',req:true},
      {id:'walk_ok',label:'Walk test — no squeaking or board movement',type:'yn',req:true},
      {id:'protection_ok',label:'Protection and signage in place',type:'yn',req:true},
      {id:'visual_comments',label:'Comments',type:'textarea',full:true},{id:'visual_photo',label:'Photo References',type:'text',full:true},
    ]},
    {title:'Defect Log',num:'03',fields:[{id:'defect_table',label:'Defects Identified',type:'defect_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'outcome',label:'Inspection Outcome',type:'select',opts:['Compliant','Requires Remedial Works','Escalated to NCR'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F09',title:'Material Delivery Log',hold:false,qitp:'MC-01 to MC-05',freq:'Every Delivery',
   desc:'Log all board, adhesive, finish system and accessory deliveries. Batch traceability, DoP and storage records.',
   sections:[
    {title:'Delivery Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'supplier',label:'Supplier',type:'text',req:true},{id:'date',label:'Date',type:'date',req:true},
      {id:'logged_by',label:'Logged By',type:'text',req:true},
    ]},
    {title:'Delivery Log',num:'02',fields:[{id:'delivery_table',label:'Deliveries Received',type:'delivery_table',full:true}]},
    {title:'Batch Allocation',num:'03',fields:[{id:'batch_alloc',label:'Batch Allocation to Rooms',type:'batch_alloc',full:true}]},
    {title:'Rejected Materials',num:'04',fields:[{id:'rejected_table',label:'Rejected Materials',type:'rejected_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F10',title:'Calibration Register',hold:false,qitp:'PRC-04, TC-03',freq:'Periodic',
   desc:'Calibration register for moisture meters, hygrometers and all measurement equipment used in hardwood flooring works.',
   sections:[
    {title:'Register Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'maintained_by',label:'Maintained By',type:'text',req:true},{id:'review_date',label:'Last Review Date',type:'date',req:true},
    ]},
    {title:'Equipment Register',num:'02',fields:[{id:'equip_table',label:'Equipment',type:'equip_table',full:true}]},
    {title:'Out of Calibration Record',num:'03',fields:[{id:'oc_table',label:'Out of Calibration / Quarantine',type:'oc_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'qa_manager',label:'QA Manager',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'all_calibrated',label:'All equipment calibrated and in-date',type:'yn',req:true,full:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F11',title:'QA Pack Index',hold:true,qitp:'TC-05',freq:'On Completion',
   desc:'Confirms all F00–F10 records complete and signed. All hold points closed. HOLD POINT before Aconex submission.',
   sections:[
    {title:'Pack Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',req:true},
      {id:'install_num',label:'Installation Reference',type:'text',req:true},{id:'block',label:'Block / Plot',type:'text',req:true},
      {id:'level',label:'Level',type:'text',req:true},{id:'completion_date',label:'Date of Completion',type:'date',req:true},
      {id:'compiled_by',label:'Compiled By',type:'text',req:true},
    ]},
    {title:'Inspection Records Checklist',num:'02',fields:[
      {id:'f00_incl',label:'F00 Benchmark Acceptance (if applicable)',type:'yn'},
      {id:'f01_incl',label:'F01 Pre-Installation Checklist',type:'yn',req:true},
      {id:'f02_incl',label:'F02 Installation Record',type:'yn',req:true},
      {id:'f03_incl',label:'F03 Level and Lippage Log',type:'yn',req:true},
      {id:'f04_incl',label:'F04 SR Test Record (HOLD)',type:'yn',req:true},
      {id:'f05_incl',label:'F05 Moisture Content Test Report (HOLD)',type:'yn',req:true},
      {id:'f06_incl',label:'F06 Sanding and Finishing Record',type:'yn',req:true},
      {id:'f07_incl',label:'F07 Protection Log',type:'yn',req:true},
      {id:'f08_incl',label:'F08 Post Installation Inspection',type:'yn',req:true},
      {id:'f09_incl',label:'F09 Material Delivery Log',type:'yn',req:true},
      {id:'f10_incl',label:'F10 Calibration Register',type:'yn',req:true},
    ]},
    {title:'Hold Point Confirmation',num:'03',fields:[
      {id:'hp_benchmark',label:'Benchmark Accepted (F00)',type:'yn',req:true},
      {id:'hp_sr',label:'SR Test Compliant (F04)',type:'yn',req:true},
      {id:'hp_mc',label:'Board MC Stable and Within Target (F05)',type:'yn',req:true},
      {id:'hp_qapack',label:'QA Pack Compiled (F11)',type:'yn',req:true},
    ]},
    {title:'Submission & Declaration',num:'04',fields:[
      {id:'aconex_mail',label:'Aconex Mail Type',type:'text',req:true},{id:'aconex_ref',label:'Aconex Reference No.',type:'text',req:true},
      {id:'submit_date',label:'Date Submitted',type:'date',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'contracts_mgr',label:'AJK Contracts Manager',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F12',title:'Area Handover Certificate',hold:true,qitp:'Handover',freq:'Final Handover',
   desc:'Formal area release to Multiplex. All QITP tests passed and hold points closed. Hardwood flooring released for occupation.',
   sections:[
    {title:'Handover Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',req:true},
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'install_nums',label:'Installation Numbers',type:'text',req:true},
      {id:'install_complete',label:'Date of Flooring Completion',type:'date',req:true},
      {id:'handover_date',label:'Date of Handover Inspection',type:'date',req:true},
    ]},
    {title:'Compliance Summary',num:'02',fields:[
      {id:'c_level',label:'F03 — Level / Lippage Within Tolerance',type:'yn',req:true},
      {id:'c_sr',label:'F04 — SR Class Achieved',type:'yn',req:true},
      {id:'c_mc',label:'F05 — Board MC Stable and Within Target',type:'yn',req:true},
      {id:'c_finish',label:'F06 — Sanding and Finishing Record Complete',type:'yn',req:true},
      {id:'c_protect',label:'F07 — Protection Period Achieved',type:'yn',req:true},
      {id:'c_postinstall',label:'F08 — No Unresolved Defects',type:'yn',req:true},
      {id:'c_qapack',label:'F11 — QA Pack Submitted via Aconex',type:'yn',req:true},
    ]},
    {title:'Area Condition at Handover',num:'03',fields:[
      {id:'boards_clean',label:'Board surfaces clean and undamaged',type:'yn',req:true},
      {id:'finish_cured',label:'Finish coat fully cured and uniform',type:'yn',req:true},
      {id:'no_gaps',label:'No unacceptable gaps or lippage present',type:'yn',req:true},
      {id:'trims_ok',label:'Expansion gaps covered by trims / threshold strips',type:'yn',req:true},
      {id:'no_loading_dmg',label:'No premature loading damage',type:'yn',req:true},
      {id:'suitable_occ',label:'Area suitable for occupation',type:'yn',req:true},
    ]},
    {title:'Declaration',num:'04',fields:[
      {id:'outstanding',label:'Outstanding Items',type:'select',opts:['No outstanding defects','Minor snags listed in notes (non-structural)','NCRs raised and closed'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'ajk_qa',label:'AJK QA Manager',type:'text',req:true},
      {id:'mpx_rep',label:'MPX Representative',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'notes',label:'Notes / Snag List',type:'textarea',full:true},
    ]},
  ]},
];

// ═══════════════════════════════════════════════════════
// FLOOR TILING FORMS (F00–F12)
// Standards: BS 5385-3/4, BS EN 12004, BS EN 13888, BS EN ISO 13006
// ═══════════════════════════════════════════════════════
const TILING_FORMS = [
  {id:'F00',title:'Benchmark Acceptance',hold:true,qitp:'PRC-05',freq:'First Install Only',
   desc:'Benchmark tile installation. Tile type, adhesive class, joint width, grout, lippage and finish accepted as project standard.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},{id:'sub_temp',label:'Substrate Temp (°C)',type:'number',req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
    ]},
    {title:'Material Confirmation',num:'02',fields:[
      {id:'tile_type',label:'Tile type / format / classification confirmed',type:'yn',hint:'BS EN ISO 13006 Group / Approved submittal',req:true},
      {id:'adhesive_class',label:'Adhesive type and class confirmed',type:'yn',hint:'BS EN 12004 — C1/C2/D1/D2/F/S1/S2',req:true},
      {id:'grout_type',label:'Grout type and class confirmed',type:'yn',hint:'BS EN 13888 — CG1/CG2/RG/FJ',req:true},
      {id:'movement_spec',label:'Movement joint specification confirmed',type:'yn',hint:'BS 5385 — max 4.5m internal bays',req:true},
      {id:'primer_ok',label:'Primer type confirmed (if specified)',type:'yn'},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Substrate Acceptance',num:'03',fields:[
      {id:'sub_rh',label:'Substrate RH within adhesive TDS limit',type:'yn',hint:'≤75% RH unless C2/D2/FJ specified — BS 5385',req:true},
      {id:'sub_sr',label:'Substrate SR within tolerance for tile format',type:'yn',hint:'SR2 for tiles >400mm — BS 5385',req:true},
      {id:'sub_clean',label:'Substrate clean, dust-free and primed',type:'yn',req:true},
      {id:'sub_strength',label:'Structural integrity confirmed',type:'yn',req:true},
      {id:'sub_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Verification',num:'04',fields:[
      {id:'layout_ok',label:'Setting out confirmed per approved layout drawing',type:'yn',req:true},
      {id:'notch_trowel',label:'Correct notched trowel used — full bed achieved',type:'yn',hint:'≥80% coverage dry / BS 5385-3',req:true},
      {id:'back_butter',label:'Back buttering applied (large format / natural stone)',type:'yn'},
      {id:'joint_width',label:'Joint widths correct and consistent per drawing',type:'yn',req:true},
      {id:'movement_joints',label:'Movement joints at correct locations and centres',type:'yn',hint:'Max 4.5m internal / at perimeter / column bases',req:true},
      {id:'lippage_ok',label:'Lippage within permitted tolerance',type:'yn',hint:'Max 2mm BS 5385 / confirm per spec',req:true},
      {id:'install_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Grouting Verification',num:'05',fields:[
      {id:'cure_wait_ok',label:'Adhesive cure period achieved before grouting',type:'yn',hint:'Min 24–48hrs or per adhesive TDS',req:true},
      {id:'grout_mix_ok',label:'Grout mixed to correct W:P ratio',type:'yn',hint:'Per grout TDS',req:true},
      {id:'colour_ok',label:'Grout colour matches approved sample',type:'yn',req:true},
      {id:'joints_full',label:'All joints fully filled and tooled',type:'yn',req:true},
      {id:'movement_sealed',label:'Movement joints sealed with compatible sealant — not grout',type:'yn',hint:'BS EN ISO 11600 / BS 5385',req:true},
      {id:'grout_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Declaration',num:'06',fields:[
      {id:'outcome',label:'Benchmark Outcome',type:'select',opts:['Accepted – Production Installs May Proceed','Accepted Subject to Minor Rectification','Rejected – Further Benchmark Required'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_pm',label:'MPX Package Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F01',title:'Pre-Installation Checklist',hold:false,qitp:'PRC-06, SC-01 to SC-03',freq:'Every Installation',
   desc:'Complete before every tiling installation. Substrate RH/SR, setting out, area release, UFH commissioning and material checks.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Apartment / Area Reference',type:'text',req:true},{id:'install_num',label:'Installation Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},
      {id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},{id:'sub_temp',label:'Substrate Temp (°C)',type:'number',req:true},
      {id:'supervisor',label:'Trade Supervisor',type:'text',req:true},{id:'mpx_rep',label:'MPX Rep',type:'text',req:true},
    ]},
    {title:'Area Release',num:'02',fields:[
      {id:'area_release',label:'Formal Area Release Received',type:'yn',req:true},
      {id:'no_trades',label:'No conflicting trades present',type:'yn',req:true},
      {id:'ufh_ok',label:'Underfloor heating commissioned, tested and at tiling temp (if applicable)',type:'yn',hint:'UFH must be run-in and at correct temp before tiling — BS 5385',},
      {id:'access_ok',label:'Access and logistics confirmed',type:'yn',req:true},
      {id:'area_comments',label:'Comments',type:'textarea',full:true},{id:'area_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Substrate Inspection',num:'03',fields:[
      {id:'sub_clean',label:'Substrate clean and dust-free',type:'yn',req:true},
      {id:'sub_rh_ok',label:'Substrate RH within adhesive TDS limit',type:'yn',req:true},
      {id:'sub_sr_ok',label:'Substrate SR within tolerance for specified tile format',type:'yn',req:true},
      {id:'sub_primed',label:'Substrate primed as specified',type:'yn'},
      {id:'movement_marked',label:'Movement and expansion joint locations marked out',type:'yn',req:true},
      {id:'sub_comments',label:'Comments',type:'textarea',full:true},{id:'sub_photo',label:'Photo Reference',type:'text',full:true},
    ]},
    {title:'Setting Out Confirmation',num:'04',fields:[
      {id:'layout_confirmed',label:'Setting out confirmed against approved layout drawing',type:'yn',req:true},
      {id:'cut_tiles_ok',label:'Cut tile sizes acceptable — min 1/3 tile at perimeter',type:'yn',hint:'No slivers permitted — BS 5385',req:true},
      {id:'datum_snapped',label:'Datum lines snapped, checked and agreed',type:'yn',req:true},
      {id:'so_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Materials On Site',num:'05',fields:[
      {id:'tiles_ok',label:'Tiles on site — correct type / batch / shade batch',type:'yn',req:true},
      {id:'adhesive_ok',label:'Adhesive on site — correct class / in-date',type:'yn',req:true},
      {id:'grout_ok',label:'Grout on site — correct class / colour',type:'yn',req:true},
      {id:'sealant_ok',label:'Movement joint sealant on site — correct colour / type',type:'yn',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Supervisor Declaration',num:'06',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_name',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'overall_status',label:'Overall Form Status',type:'select',opts:['All Items Compliant','Minor Issues Noted — Works May Proceed','HOLD — Do Not Proceed'],req:true,full:true},
      {id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F02',title:'Tiling Installation Record',hold:false,qitp:'SC-04, SC-05, MC-01',freq:'Every Installation',
   desc:'Tile, adhesive and grout installation record. Coverage, joint widths, lippage, shade batches and movement joints per area.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Install Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'submittal_ref',label:'Approved Technical Submittal Ref',type:'text',req:true},
      {id:'supervisor',label:'Installation Supervisor',type:'text',req:true},
    ]},
    {title:'Material Verification',num:'02',fields:[
      {id:'tile_batch',label:'Tile batch and shade batch recorded',type:'yn',req:true},
      {id:'tile_class_ok',label:'Tile classification matches specification',type:'yn',hint:'BS EN ISO 13006',req:true},
      {id:'adhesive_batch',label:'Adhesive batch and expiry date recorded',type:'yn',req:true},
      {id:'grout_batch',label:'Grout batch and expiry date recorded',type:'yn',req:true},
      {id:'mat_comments',label:'Comments',type:'textarea',full:true},
    ]},
    {title:'Installation Record',num:'03',fields:[{id:'tiling_install_rec',label:'Tiling Installation Log per Area',type:'tiling_install_rec',full:true}]},
    {title:'Non-Conformance Record',num:'04',fields:[{id:'tiling_install_nc',label:'Non-Conformances',type:'tiling_install_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'coverage_ok',label:'Adhesive coverage ≥80% confirmed throughout (≥95% wet areas)',type:'yn',hint:'BS 5385 / BS EN 12004',req:true},
      {id:'movement_ok',label:'All movement and expansion joints installed correctly',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F03',title:'Level & Lippage Log',hold:false,qitp:'SC-06, TC-01',freq:'Every Installation',
   desc:'FFL and tile-to-tile lippage checks. Level compliance and lippage between adjacent tiles recorded per room. Ref BS 5385.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_num',label:'Install Number',type:'text',req:true},
      {id:'date',label:'Date',type:'date',req:true},{id:'drawing_ref',label:'Drawing Reference',type:'text',req:true},
      {id:'design_ffl',label:'Design FFL',type:'text',req:true},
      {id:'max_lippage',label:'Max Permitted Lippage (mm)',type:'number',req:true,hint:'Typically 2mm — BS 5385'},
      {id:'datum_ref',label:'Datum Reference',type:'text',req:true},{id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Level & Lippage Log',num:'03',fields:[{id:'tiling_level_log',label:'Level and Lippage Measurements',type:'tiling_level_log',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'level_nc',label:'Non-Conformance Actions',type:'level_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F04',title:'SR Test Record',hold:true,qitp:'TC-02',freq:'On Completion',
   desc:'Surface regularity straightedge testing to BS 5385. HOLD POINT — floor must meet SR class and lippage limits before handover.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'sr_class',label:'Specified SR Class',type:'select',opts:['SR1 (±3mm)','SR2 (±5mm)','SR3 (±10mm)'],req:true},
      {id:'max_dev',label:'Max Permitted SR Deviation (mm)',type:'number',req:true},
      {id:'max_lippage',label:'Max Permitted Lippage (mm)',type:'number',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_sr_summary',label:'Room Summary',type:'room_sr_summary',full:true}]},
    {title:'SR & Lippage Test Log',num:'03',fields:[{id:'tiling_sr_log',label:'Test Readings',type:'tiling_sr_log',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'sr_nc_table',label:'Non-Conformance Actions',type:'sr_nc_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall SR Test Result',type:'select',opts:['PASS — Compliant with SR Class and Lippage Limits','FAIL — Rectification Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F05',title:'Adhesive Bond Strength Test',hold:true,qitp:'TC-03',freq:'On Completion',
   desc:'Pull-off adhesion testing to BS EN 1348 and BS 5385. HOLD POINT — bond strength must meet adhesive class minimum before handover.',
   sections:[
    {title:'Test Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'test_date',label:'Date of Test',type:'date',req:true},
      {id:'tile_age',label:'Age Since Tiling (Days)',type:'number',req:true},
      {id:'adhesive_class',label:'Adhesive Class',type:'select',opts:['C1 Normal Set (≥0.5 N/mm²)','C2 Improved (≥1.0 N/mm²)','C2F Fast Set (≥1.0 N/mm²)','C2S1 Deformable (≥1.0 N/mm²)','C2S2 Highly Deformable (≥1.0 N/mm²)','D1 Dispersion (≥1.0 N/mm²)','D2 Improved Dispersion (≥1.0 N/mm²)'],req:true,full:true},
      {id:'min_strength',label:'Min. Specified Bond Strength (N/mm²)',type:'number',req:true},
      {id:'tested_by',label:'Tested By',type:'text',req:true},{id:'equip_ref',label:'Test Equipment Reference',type:'text',req:true},
      {id:'calib_ref',label:'Calibration Certificate Ref',type:'text',req:true},
    ]},
    {title:'Room Summary',num:'02',fields:[{id:'room_summary',label:'Room Summary',type:'room_summary',full:true}]},
    {title:'Pull-Off Test Log',num:'03',fields:[{id:'tiling_bond_log',label:'Bond Strength Test Readings',type:'tiling_bond_log',full:true}]},
    {title:'Non-Conformance',num:'04',fields:[{id:'tiling_bond_nc',label:'Non-Conformance Actions',type:'tiling_bond_nc',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'overall_result',label:'Overall Bond Strength Test Result',type:'select',opts:['PASS — All Areas Meet Minimum Bond Strength','FAIL — Remedial Works Required','FAIL — Area Rejected'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F06',title:'Grout & Movement Joint Record',hold:false,qitp:'TC-04',freq:'Per Grouting Cycle',
   desc:'Grout application, joint filling, movement joint and sealant installation record per area. Ref BS EN 13888 and BS 5385.',
   sections:[
    {title:'Area Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'date',label:'Date',type:'date',req:true},
      {id:'amb_temp',label:'Ambient Temp (°C)',type:'number',req:true},{id:'sub_temp',label:'Substrate Temp (°C)',type:'number',req:true},
      {id:'adhesive_cured',label:'Adhesive cure period achieved before grouting',type:'yn',hint:'Per adhesive TDS — typically 24–48hrs / BS 5385',req:true},
      {id:'operator',label:'Operator',type:'text',req:true},
    ]},
    {title:'Grout Application Record',num:'02',fields:[{id:'grout_rec',label:'Grout Application Log',type:'grout_rec',full:true}]},
    {title:'Movement Joint Record',num:'03',fields:[{id:'movement_joint_rec',label:'Movement Joint Installation Log',type:'movement_joint_rec',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'joints_full',label:'All tile joints fully grouted and tooled',type:'yn',req:true},
      {id:'movement_sealed',label:'All movement joints sealed with compatible sealant (not grout)',type:'yn',req:true},
      {id:'grout_cured',label:'Grout fully cured before trafficking — per grout TDS',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F07',title:'Protection Log',hold:false,qitp:'SC-09',freq:'Daily During Protection',
   desc:'Daily monitoring during tile cure and protection period. Trafficking, grout cure status, surface condition and protection integrity.',
   sections:[
    {title:'Installation Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Date Tiled',type:'date',req:true},
      {id:'grout_date',label:'Date Grouted',type:'date',req:true},
      {id:'min_cure',label:'Min. Protection / Cure Period',type:'text',req:true},
      {id:'protect_method',label:'Protection Method',type:'text',req:true},{id:'release_date',label:'Release Date Eligible',type:'date',req:true},
      {id:'supervisor',label:'Supervisor',type:'text',req:true},
    ]},
    {title:'Daily Protection Log',num:'02',fields:[{id:'protection_daily',label:'Daily Monitoring Records',type:'protection_daily',full:true}]},
    {title:'Declaration',num:'03',fields:[
      {id:'period_compliant',label:'Cure and Protection Period Compliant',type:'yn',req:true},
      {id:'grout_cured',label:'Grout confirmed fully cured before protection removal',type:'yn',req:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'mpx_qa',label:'MPX QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F08',title:'Post Installation Inspection',hold:false,qitp:'SC-10, PC-01',freq:'Every Installation',
   desc:'Post-installation visual inspection. Tile condition, grout, lippage, tap test for hollow tiles, movement joints and defect log.',
   sections:[
    {title:'Inspection Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'area_ref',label:'Area Reference',type:'text',req:true},{id:'install_date',label:'Installation Date',type:'date',req:true},
      {id:'inspection_date',label:'Inspection Date',type:'date',req:true},{id:'inspector',label:'Inspector',type:'text',req:true},
    ]},
    {title:'Visual Inspection Checklist',num:'02',fields:[
      {id:'tiles_undamaged',label:'Tile surfaces clean, undamaged and matching approved sample',type:'yn',req:true},
      {id:'no_hollow',label:'No hollow or debonded tiles (tap test)',type:'yn',hint:'BS 5385 tap test methodology — 100% check',req:true},
      {id:'lippage_ok',label:'Lippage within permitted tolerance throughout',type:'yn',req:true},
      {id:'grout_full',label:'Grout joints fully filled, consistent colour and tooled',type:'yn',req:true},
      {id:'movement_ok',label:'Movement joints correctly installed and sealed',type:'yn',req:true},
      {id:'edge_trims_ok',label:'Edge trims and threshold strips correctly installed',type:'yn'},
      {id:'protection_ok',label:'Protection in place',type:'yn',req:true},
      {id:'visual_comments',label:'Comments',type:'textarea',full:true},{id:'visual_photo',label:'Photo References',type:'text',full:true},
    ]},
    {title:'Defect Log',num:'03',fields:[{id:'defect_table',label:'Defects Identified',type:'defect_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'outcome',label:'Inspection Outcome',type:'select',opts:['Compliant','Requires Remedial Works','Escalated to NCR'],req:true,full:true},
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F09',title:'Material Delivery Log',hold:false,qitp:'MC-01 to MC-05',freq:'Every Delivery',
   desc:'Log all tile, adhesive, grout, sealant and accessory deliveries. Shade batch traceability, DoP confirmation and storage records.',
   sections:[
    {title:'Delivery Details',num:'01',fields:[
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'supplier',label:'Supplier',type:'text',req:true},{id:'date',label:'Date',type:'date',req:true},
      {id:'logged_by',label:'Logged By',type:'text',req:true},
    ]},
    {title:'Delivery Log',num:'02',fields:[{id:'delivery_table',label:'Deliveries Received',type:'delivery_table',full:true}]},
    {title:'Batch Allocation',num:'03',fields:[{id:'batch_alloc',label:'Batch Allocation to Installation Areas',type:'batch_alloc',full:true}]},
    {title:'Rejected Materials',num:'04',fields:[{id:'rejected_table',label:'Rejected Materials',type:'rejected_table',full:true}]},
    {title:'Declaration',num:'05',fields:[
      {id:'supervisor_name',label:'AJK Site Supervisor',type:'text',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F10',title:'Calibration Register',hold:false,qitp:'PRC-04, TC-03, TC-05',freq:'Periodic',
   desc:'Calibration register for pull-off bond testers, hygrometers, thermometers and all test equipment used in tiling works.',
   sections:[
    {title:'Register Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'maintained_by',label:'Maintained By',type:'text',req:true},{id:'review_date',label:'Last Review Date',type:'date',req:true},
    ]},
    {title:'Equipment Register',num:'02',fields:[{id:'equip_table',label:'Equipment',type:'equip_table',full:true}]},
    {title:'Out of Calibration Record',num:'03',fields:[{id:'oc_table',label:'Out of Calibration / Quarantine',type:'oc_table',full:true}]},
    {title:'Declaration',num:'04',fields:[
      {id:'qa_manager',label:'QA Manager',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'all_calibrated',label:'All equipment calibrated and in-date',type:'yn',req:true,full:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F11',title:'QA Pack Index',hold:true,qitp:'TC-05',freq:'On Completion',
   desc:'Confirms all F00–F10 records complete and signed. All hold points closed. HOLD POINT before Aconex submission.',
   sections:[
    {title:'Pack Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',req:true},
      {id:'install_num',label:'Installation Reference',type:'text',req:true},{id:'block',label:'Block / Plot',type:'text',req:true},
      {id:'level',label:'Level',type:'text',req:true},{id:'completion_date',label:'Date of Completion',type:'date',req:true},
      {id:'compiled_by',label:'Compiled By',type:'text',req:true},
    ]},
    {title:'Inspection Records Checklist',num:'02',fields:[
      {id:'f00_incl',label:'F00 Benchmark Acceptance (if applicable)',type:'yn'},
      {id:'f01_incl',label:'F01 Pre-Installation Checklist',type:'yn',req:true},
      {id:'f02_incl',label:'F02 Tiling Installation Record',type:'yn',req:true},
      {id:'f03_incl',label:'F03 Level and Lippage Log',type:'yn',req:true},
      {id:'f04_incl',label:'F04 SR Test Record (HOLD)',type:'yn',req:true},
      {id:'f05_incl',label:'F05 Adhesive Bond Strength Test (HOLD)',type:'yn',req:true},
      {id:'f06_incl',label:'F06 Grout and Movement Joint Record',type:'yn',req:true},
      {id:'f07_incl',label:'F07 Protection Log',type:'yn',req:true},
      {id:'f08_incl',label:'F08 Post Installation Inspection',type:'yn',req:true},
      {id:'f09_incl',label:'F09 Material Delivery Log',type:'yn',req:true},
      {id:'f10_incl',label:'F10 Calibration Register',type:'yn',req:true},
    ]},
    {title:'Hold Point Confirmation',num:'03',fields:[
      {id:'hp_benchmark',label:'Benchmark Accepted (F00)',type:'yn',req:true},
      {id:'hp_sr',label:'SR Test and Lippage Compliant (F04)',type:'yn',req:true},
      {id:'hp_bond',label:'Adhesive Bond Strength Test Passed (F05)',type:'yn',req:true},
      {id:'hp_qapack',label:'QA Pack Compiled (F11)',type:'yn',req:true},
    ]},
    {title:'Submission & Declaration',num:'04',fields:[
      {id:'aconex_mail',label:'Aconex Mail Type',type:'text',req:true},{id:'aconex_ref',label:'Aconex Reference No.',type:'text',req:true},
      {id:'submit_date',label:'Date Submitted',type:'date',req:true},{id:'qa_manager',label:'QA Manager',type:'text',req:true},
      {id:'contracts_mgr',label:'AJK Contracts Manager',type:'text',req:true},{id:'mpx_rep',label:'MPX Representative',type:'text',req:true},
      {id:'decl_date',label:'Declaration Date',type:'date',req:true},{id:'notes',label:'Notes',type:'textarea',full:true},
    ]},
  ]},
  {id:'F12',title:'Area Handover Certificate',hold:true,qitp:'Handover',freq:'Final Handover',
   desc:'Formal area release to Multiplex. All QITP tests passed and hold points closed. Tiling released for occupation.',
   sections:[
    {title:'Handover Details',num:'01',fields:[
      {id:'pkg_ref',label:'Package Reference',type:'text',val:'E901E',req:true},
      {id:'qitp_ref',label:'QITP Reference',type:'text',req:true},
      {id:'block',label:'Block / Plot',type:'text',req:true},{id:'level',label:'Level',type:'text',req:true},
      {id:'install_nums',label:'Installation Numbers',type:'text',req:true},
      {id:'install_complete',label:'Date of Tiling Completion',type:'date',req:true},
      {id:'handover_date',label:'Date of Handover Inspection',type:'date',req:true},
    ]},
    {title:'Compliance Summary',num:'02',fields:[
      {id:'c_level',label:'F03 — Level / Lippage Within Tolerance',type:'yn',req:true},
      {id:'c_sr',label:'F04 — SR Class Achieved',type:'yn',req:true},
      {id:'c_bond',label:'F05 — Bond Strength Test Passed',type:'yn',req:true},
      {id:'c_grout',label:'F06 — Grout and Movement Joints Complete',type:'yn',req:true},
      {id:'c_protect',label:'F07 — Protection and Cure Period Achieved',type:'yn',req:true},
      {id:'c_postinstall',label:'F08 — No Unresolved Defects',type:'yn',req:true},
      {id:'c_qapack',label:'F11 — QA Pack Submitted via Aconex',type:'yn',req:true},
    ]},
    {title:'Area Condition at Handover',num:'03',fields:[
      {id:'tiles_clean',label:'Tile surfaces clean and undamaged',type:'yn',req:true},
      {id:'no_hollow',label:'No hollow or debonded tiles',type:'yn',req:true},
      {id:'grout_ok',label:'Grout consistent, fully cured and complete',type:'yn',req:true},
      {id:'movement_ok',label:'Movement joints sealed and complete',type:'yn',req:true},
      {id:'no_loading_dmg',label:'No premature loading damage',type:'yn',req:true},
      {id:'suitable_occ',label:'Area suitable for occupation',type:'yn',req:true},
    ]},
    {title:'Declaration',num:'04',fields:[
      {id:'outstanding',label:'Outstanding Items',type:'select',opts:['No outstanding defects','Minor snags listed in notes (non-structural)','NCRs raised and closed'],req:true,full:true},
      {id:'ajk_supervisor',label:'AJK Site Supervisor',type:'text',req:true},{id:'ajk_qa',label:'AJK QA Manager',type:'text',req:true},
      {id:'mpx_rep',label:'MPX Representative',type:'text',req:true},{id:'decl_date',label:'Declaration Date',type:'date',req:true},
      {id:'notes',label:'Notes / Snag List',type:'textarea',full:true},
    ]},
  ]},
];


// Merge extra table definitions
Object.assign(TABLE_DEFS, RAF_TABLE_EXTRAS, HW_TABLE_EXTRAS, TILING_TABLE_EXTRAS);

const SCOPE_CONFIG = {
  screed: {
    label:'Screed',
    qitp:'TVC-AJK-EE-ZZ-QP-X-00007',
    heading:'Screed Inspection & Test Forms',
    forms: SCREED_FORMS,
    holdForms:['F00','F04','F05','F11','F12'],
    // prereqs: formCode → array of formCodes that must be Submitted first
    prereqs:{ F04:['F00'], F05:['F04'], F11:['F05'], F12:['F11'] },
  },
  cb: {
    label:'Cradle & Batten',
    qitp:'TVC-AJK-EE-ZZ-QP-X-43010',
    heading:'Cradle & Batten Inspection & Test Forms',
    forms: CB_FORMS,
    holdForms:['F00','F04','F05','F11','F12'],
    prereqs:{ F04:['F00'], F05:['F04'], F11:['F05'], F12:['F11'] },
  },
  raf: {
    label:'Raised Access Floor',
    qitp:'TVC-AJK-EE-ZZ-QP-X-RAF01',
    heading:'Raised Access Floor Inspection & Test Forms',
    forms: RAF_FORMS,
    holdForms:['F00','F04','F05','F11','F12'],
    prereqs:{ F04:['F00'], F05:['F04'], F11:['F05'], F12:['F11'] },
  },
  hw: {
    label:'Hardwood Flooring',
    qitp:'TVC-AJK-EE-ZZ-QP-X-HW01',
    heading:'Hardwood Flooring Inspection & Test Forms',
    forms: HW_FORMS,
    holdForms:['F00','F04','F05','F11','F12'],
    prereqs:{ F04:['F00'], F05:['F04'], F11:['F05'], F12:['F11'] },
  },
  tiling: {
    label:'Floor Tiling',
    qitp:'TVC-AJK-EE-ZZ-QP-X-TL01',
    heading:'Floor Tiling Inspection & Test Forms',
    forms: TILING_FORMS,
    holdForms:['F00','F04','F05','F11','F12'],
    prereqs:{ F04:['F00'], F05:['F04'], F11:['F05'], F12:['F11'] },
  },
};


// ═══════════════════════════════════════════════════════
// RUNTIME STATE
// ═══════════════════════════════════════════════════════
let currentUser    = null;
let currentProject = null;
let currentBlock   = null;
let currentLevel   = null;
let currentArea    = null;
let currentScope   = null;   // selected scope key (e.g. 'screed', 'cb', ...)
let currentForm       = null;   // { formDef, scopeKey }
let pendingRevision   = null;   // { parentForm, revision, rootFormId } when resubmitting
let currentRegisterForm = null; // { formCode, scopeKey } — context for register view
let currentEditingId  = null;   // id of Draft record being continued

// ═══════════════════════════════════════════════════════
// VIEW ROUTING
// ═══════════════════════════════════════════════════════
function showView(name){
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const v = document.getElementById('view-'+name);
  if(v) v.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const nb = document.getElementById('nav-'+name);
  if(nb) nb.classList.add('active');
  // Show/hide site header — hide only on login
  const hdr = document.getElementById('site-header');
  if(hdr) hdr.style.display = (name === 'login') ? 'none' : '';
  window.scrollTo(0,0);
}

// ═══════════════════════════════════════════════════════
// SEED DATA (TVC2 project hierarchy)
// ═══════════════════════════════════════════════════════
function seedData(){
  if(projects.length) return; // already seeded
  const pid = 'p1';
  projects.push({id:pid, code:'TVC2', name:'TVC2 — Television Centre', client:'MPX', status:'Active'});

  const blocks = [
    {id:'b1',projectId:pid,name:'Plot E',code:'PE'},
    {id:'b2',projectId:pid,name:'Plot G',code:'PG'},
    {id:'b3',projectId:pid,name:'Townhouses',code:'TH'},
  ];
  blocks.forEach(b => projectBlocks.push(b));

  // Levels per block
  const levels = [
    // Plot E
    {id:'l1',projectId:pid,blockId:'b1',name:'Ground Floor',code:'L00'},
    {id:'l2',projectId:pid,blockId:'b1',name:'Level 01',code:'L01'},
    {id:'l3',projectId:pid,blockId:'b1',name:'Level 02',code:'L02'},
    {id:'l4',projectId:pid,blockId:'b1',name:'Level 03',code:'L03'},
    {id:'l5',projectId:pid,blockId:'b1',name:'Level 04',code:'L04'},
    // Plot G
    {id:'l6',projectId:pid,blockId:'b2',name:'Ground Floor',code:'L00'},
    {id:'l7',projectId:pid,blockId:'b2',name:'Level 01',code:'L01'},
    {id:'l8',projectId:pid,blockId:'b2',name:'Level 02',code:'L02'},
    // Townhouses
    {id:'l9',projectId:pid,blockId:'b3',name:'Ground Floor',code:'L00'},
    {id:'l10',projectId:pid,blockId:'b3',name:'First Floor',code:'L01'},
  ];
  levels.forEach(l => projectLevels.push(l));

  // Sample areas (a handful per level)
  let aIdx = 1;
  function makeAreas(levelId, blockId, count){
    for(let i=1;i<=count;i++){
      const num = String(i).padStart(3,'0');
      // scopeKeys: [] = all scopes available; populated = restricted to those scopes only
      projectAreas.push({id:'a'+aIdx, projectId:pid, blockId, levelId, name:'Area '+num, code:'A'+num, scopeKeys:[]});
      aIdx++;
    }
  }
  makeAreas('l1','b1',8); makeAreas('l2','b1',8); makeAreas('l3','b1',6);
  makeAreas('l4','b1',6); makeAreas('l5','b1',4);
  makeAreas('l6','b2',6); makeAreas('l7','b2',6); makeAreas('l8','b2',4);
  makeAreas('l9','b3',4); makeAreas('l10','b3',4);

  saveData();
}

// ═══════════════════════════════════════════════════════
// HELPERS — hierarchy queries
// ═══════════════════════════════════════════════════════
function getBlocksForProject(pid){
  return projectBlocks.filter(b => b.projectId === pid);
}
function getLevelsForBlock(pid, bid){
  return projectLevels.filter(l => l.projectId === pid && l.blockId === bid);
}
function getAreasForLevel(pid, bid, lid){
  return projectAreas.filter(a => a.projectId === pid && a.blockId === bid && a.levelId === lid);
}
function getFormsForArea(areaId){
  return forms.filter(f => f.areaId === areaId);
}
function getLatestRevision(rootFormId){
  const chain = forms.filter(f => f.rootFormId === rootFormId || f.id === rootFormId);
  return chain.sort((a,b) => b.revision - a.revision)[0] || null;
}
function generateSystemFormId(){
  return 'FRM-' + new Date().toISOString();
}
function generateFormReference(project, block, level, area, formCode, revision){
  // e.g. TVC2-PE-L03-A012-F07-REV00
  const proj  = (project.code || project.name).substring(0,6).replace(/\s/g,'');
  const blk   = block.code || block.name.substring(0,4).replace(/\s/g,'');
  const lvl   = level.code || ('L' + level.name.replace(/\D/g,'').padStart(2,'0'));
  const ar    = area.code || ('A' + area.name.replace(/\D/g,'').padStart(3,'0'));
  const rev   = 'REV' + String(revision || 0).padStart(2,'0');
  return `${proj}-${blk}-${lvl}-${ar}-${formCode}-${rev}`;
}

// ═══════════════════════════════════════════════════════
// HELPERS — stats
// ═══════════════════════════════════════════════════════
function getAreaFormStats(areaId){
  const aForms = getFormsForArea(areaId);
  // Latest revision per root
  const latestMap = {};
  aForms.forEach(f => {
    const root = f.rootFormId || f.id;
    const existing = latestMap[root];
    if(!existing || f.revision > existing.revision) latestMap[root] = f;
  });
  const latest = Object.values(latestMap);
  return {
    total: latest.length,
    open: latest.filter(f => f.lifecycleStatus === 'Open').length,
    submitted: latest.filter(f => f.lifecycleStatus === 'Submitted').length,
    pass: latest.filter(f => f.inspectionStatus === 'pass').length,
    fail: latest.filter(f => f.inspectionStatus === 'fail').length,
    hold: latest.filter(f => f.inspectionStatus === 'hold').length,
  };
}

// ═══════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════
function login(){
  const sel = document.getElementById('user-select');
  const uid = sel.value;
  if(!uid){ alert('Please select a user.'); return; }
  currentUser = users.find(u => u.id === uid) || {id:uid, name:sel.options[sel.selectedIndex].text};
  seedData();
  renderProjectCards();
  showView('projects');
}
function logout(){
  currentUser = currentProject = currentBlock = currentLevel = currentArea = null;
  showView('login');
}
function populateUserSelect(){
  const sel = document.getElementById('user-select');
  if(!sel) return;
  sel.innerHTML = '<option value="">— Select User —</option>' +
    users.map(u => `<option value="${u.id}">${u.name}</option>`).join('');
}

// ═══════════════════════════════════════════════════════
// PROJECTS VIEW
// ═══════════════════════════════════════════════════════
function renderProjectCards(){
  const grid = document.getElementById('project-grid');
  if(!grid) return;
  if(!projects.length){
    grid.innerHTML = '<p class="empty-msg">No projects found.</p>';
    return;
  }
  grid.innerHTML = projects.map(p => `
    <div class="select-card" onclick="selectProject('${p.id}')">
      <div class="card-code">${p.code}</div>
      <div class="card-name">${p.name}</div>
      <div class="card-sub">${p.client || ''}</div>
    </div>`).join('');
}
function selectProject(pid){
  currentProject = projects.find(p => p.id === pid);
  currentBlock = currentLevel = currentArea = null;
  renderBlockCards();
  showView('blocks');
}

// ═══════════════════════════════════════════════════════
// BLOCKS VIEW
// ═══════════════════════════════════════════════════════
function renderBlockCards(){
  updateBreadcrumb();
  const h = document.getElementById('blocks-heading');
  if(h && currentProject) h.textContent = currentProject.name;
  const grid = document.getElementById('block-grid');
  if(!grid) return;
  const blocks = getBlocksForProject(currentProject.id);
  if(!blocks.length){
    grid.innerHTML = '<p class="empty-msg">No blocks defined for this project.</p>';
    return;
  }
  grid.innerHTML = blocks.map(b => `
    <div class="select-card" onclick="selectBlock('${b.id}')">
      <div class="card-code">${b.code}</div>
      <div class="card-name">${b.name}</div>
    </div>`).join('');
}
function selectBlock(bid){
  currentBlock = projectBlocks.find(b => b.id === bid);
  currentLevel = currentArea = null;
  renderLevelCards();
  showView('levels');
}

// ═══════════════════════════════════════════════════════
// LEVELS VIEW
// ═══════════════════════════════════════════════════════
function renderLevelCards(){
  updateBreadcrumb();
  const h = document.getElementById('levels-heading');
  if(h && currentBlock) h.textContent = currentBlock.name + ' — Select Level';
  const grid = document.getElementById('level-grid');
  if(!grid) return;
  const levels = getLevelsForBlock(currentProject.id, currentBlock.id);
  if(!levels.length){
    grid.innerHTML = '<p class="empty-msg">No levels defined for this block.</p>';
    return;
  }
  grid.innerHTML = levels.map(l => `
    <div class="select-card" onclick="selectLevel('${l.id}')">
      <div class="card-code">${l.code}</div>
      <div class="card-name">${l.name}</div>
    </div>`).join('');
}
function selectLevel(lid){
  currentLevel = projectLevels.find(l => l.id === lid);
  currentArea = null;
  renderAreaCards();
  showView('areas');
}

// ═══════════════════════════════════════════════════════
// AREAS VIEW
// ═══════════════════════════════════════════════════════
function renderAreaCards(){
  updateBreadcrumb();
  const h = document.getElementById('areas-heading');
  if(h && currentLevel) h.textContent = currentBlock.name + ' · ' + currentLevel.name + ' — Select Area';
  const grid = document.getElementById('area-grid');
  if(!grid) return;
  const areas = getAreasForLevel(currentProject.id, currentBlock.id, currentLevel.id);
  if(!areas.length){
    grid.innerHTML = '<p class="empty-msg">No areas defined for this level.</p>';
    return;
  }
  grid.innerHTML = areas.map(a => {
    const stats = getAreaFormStats(a.id);
    return `<div class="select-card area-card" onclick="selectArea('${a.id}')">
      <div class="card-code">${a.code}</div>
      <div class="card-name">${a.name}</div>
      <div class="area-stats">
        <span class="stat-chip stat-sub">${stats.submitted} submitted</span>
        ${stats.pass ? `<span class="stat-chip stat-pass">${stats.pass} pass</span>` : ''}
        ${stats.fail ? `<span class="stat-chip stat-fail">${stats.fail} fail</span>` : ''}
        ${stats.hold ? `<span class="stat-chip stat-hold">${stats.hold} hold</span>` : ''}
      </div>
    </div>`;
  }).join('');
}
function selectArea(aid){
  currentArea = projectAreas.find(a => a.id === aid);
  currentScope = null;
  renderScopeCards();
  showView('scope');
}

// ═══════════════════════════════════════════════════════
// SCOPE SELECTION VIEW
// ═══════════════════════════════════════════════════════
function renderScopeCards(){
  updateBreadcrumb();
  const h = document.getElementById('scope-heading');
  if(h) h.textContent = 'Select Scope of Works';
  const lbl = document.getElementById('scope-area-label');
  if(lbl && currentArea)
    lbl.textContent = `${currentProject.code} · ${currentBlock.name} · ${currentLevel.name} · ${currentArea.name}`;

  const grid = document.getElementById('scope-grid');
  if(!grid) return;

  // Determine which scopes are available for this area.
  // area.scopeKeys[] = allocated scopes; empty / missing = all scopes available.
  const allocated = currentArea && currentArea.scopeKeys && currentArea.scopeKeys.length
    ? currentArea.scopeKeys
    : Object.keys(SCOPE_CONFIG);

  // Count existing submissions per scope for this area
  const aForms = getFormsForArea(currentArea.id);
  const scopeCounts = {};
  aForms.forEach(f => {
    scopeCounts[f.scopeKey] = (scopeCounts[f.scopeKey] || 0) + 1;
  });

  grid.innerHTML = allocated.map(key => {
    const cfg = SCOPE_CONFIG[key];
    if(!cfg) return '';
    const count = scopeCounts[key] || 0;
    const countHtml = count
      ? `<span class="scope-card-count">${count} form${count !== 1 ? 's' : ''} submitted</span>`
      : `<span class="scope-card-count scope-card-count-none">No submissions yet</span>`;
    return `<div class="scope-select-card" onclick="selectScope('${key}')">
      <div class="scope-select-icon">${scopeIcon(key)}</div>
      <div class="scope-select-body">
        <div class="scope-select-label">${cfg.label}</div>
        <div class="scope-select-qitp">${cfg.qitp}</div>
        ${countHtml}
      </div>
      <div class="scope-select-arrow">›</div>
    </div>`;
  }).join('');
}

function scopeIcon(key){
  const icons = {
    screed: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <!-- Trowel / screed levelling tool -->
      <rect x="4" y="30" width="32" height="6" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="4" y="38" width="40" height="3" rx="1.5" fill="currentColor" opacity="0.5"/>
      <rect x="30" y="12" width="4" height="20" rx="2" fill="currentColor" opacity="0.8"/>
      <rect x="26" y="8" width="12" height="6" rx="2" fill="currentColor"/>
    </svg>`,
    cb: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <!-- Cradle & Batten grid system -->
      <rect x="4" y="20" width="40" height="4" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="4" y="30" width="40" height="4" rx="2" fill="currentColor" opacity="0.9"/>
      <rect x="10" y="10" width="4" height="28" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="22" y="10" width="4" height="28" rx="2" fill="currentColor" opacity="0.7"/>
      <rect x="34" y="10" width="4" height="28" rx="2" fill="currentColor" opacity="0.7"/>
      <circle cx="10" cy="20" r="3" fill="currentColor"/>
      <circle cx="10" cy="30" r="3" fill="currentColor"/>
      <circle cx="22" cy="20" r="3" fill="currentColor"/>
      <circle cx="22" cy="30" r="3" fill="currentColor"/>
      <circle cx="34" cy="20" r="3" fill="currentColor"/>
      <circle cx="34" cy="30" r="3" fill="currentColor"/>
    </svg>`,
    raf: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <!-- Raised access floor pedestal & panel -->
      <rect x="6" y="36" width="36" height="4" rx="1" fill="currentColor" opacity="0.4"/>
      <rect x="10" y="28" width="4" height="10" rx="1" fill="currentColor" opacity="0.8"/>
      <rect x="34" y="28" width="4" height="10" rx="1" fill="currentColor" opacity="0.8"/>
      <rect x="8" y="26" width="32" height="6" rx="2" fill="currentColor" opacity="0.5"/>
      <rect x="6" y="14" width="36" height="14" rx="2" fill="currentColor" opacity="0.9"/>
      <line x1="6" y1="21" x2="42" y2="21" stroke="white" stroke-width="1.5"/>
      <line x1="24" y1="14" x2="24" y2="28" stroke="white" stroke-width="1.5"/>
    </svg>`,
    hw: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <!-- Hardwood floorboards - staggered planks -->
      <rect x="4" y="10" width="20" height="7" rx="1.5" fill="currentColor" opacity="0.9"/>
      <rect x="26" y="10" width="18" height="7" rx="1.5" fill="currentColor" opacity="0.7"/>
      <rect x="4" y="19" width="12" height="7" rx="1.5" fill="currentColor" opacity="0.7"/>
      <rect x="18" y="19" width="26" height="7" rx="1.5" fill="currentColor" opacity="0.9"/>
      <rect x="4" y="28" width="22" height="7" rx="1.5" fill="currentColor" opacity="0.9"/>
      <rect x="28" y="28" width="16" height="7" rx="1.5" fill="currentColor" opacity="0.7"/>
      <rect x="4" y="37" width="10" height="4" rx="1" fill="currentColor" opacity="0.5"/>
      <rect x="16" y="37" width="28" height="4" rx="1" fill="currentColor" opacity="0.5"/>
    </svg>`,
    tiling: `<svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
      <!-- Tile grid - 3x3 tiles with grout lines -->
      <rect x="4" y="4" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="18" y="4" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="32" y="4" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="4" y="18" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="18" y="18" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="32" y="18" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="4" y="32" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="18" y="32" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
      <rect x="32" y="32" width="12" height="12" rx="1" fill="currentColor" opacity="0.9"/>
    </svg>`,
  };
  return icons[key] || `<svg viewBox="0 0 48 48" width="48" height="48"><rect x="8" y="8" width="32" height="32" rx="4" fill="currentColor" opacity="0.8"/></svg>`;
}

function selectScope(key){
  currentScope = key;
  renderFormsView();
  showView('forms');
}

// ═══════════════════════════════════════════════════════
// FORMS VIEW (area + scope context — single scope)
// ═══════════════════════════════════════════════════════

// Check if a form is available or locked due to prerequisite hold points
// Returns { available: bool, locked: bool, lockReason: string }
function checkFormAvailability(formCode, scopeKey, submittedKey){
  const cfg = SCOPE_CONFIG[scopeKey];
  const prereqs = cfg.prereqs || {};
  const required = prereqs[formCode];
  if(!required || !required.length) return { available: true, locked: false, lockReason: '' };

  const missing = required.filter(req => {
    const rec = submittedKey[req];
    return !rec || rec.lifecycleStatus !== 'Submitted';
  });

  if(missing.length){
    const names = missing.map(code => {
      const fd = cfg.forms.find(f => f.id === code);
      return `${code}${fd ? ' — ' + fd.title : ''}`;
    });
    return {
      available: false,
      locked: true,
      lockReason: 'Locked — requires: ' + names.join(', '),
    };
  }
  return { available: true, locked: false, lockReason: '' };
}

function renderFormsView(){
  updateBreadcrumb();
  if(!currentScope) return;
  const cfg = SCOPE_CONFIG[currentScope];

  // Update headings
  const eyebrow = document.getElementById('forms-scope-eyebrow');
  if(eyebrow) eyebrow.textContent = cfg.label;
  const heading = document.getElementById('forms-heading');
  if(heading) heading.textContent = cfg.heading || cfg.label + ' — Inspection & Test Forms';
  const lbl = document.getElementById('forms-area-label');
  if(lbl && currentArea)
    lbl.textContent = `${currentProject.code} · ${currentBlock.name} · ${currentLevel.name} · ${currentArea.name}`;

  const container = document.getElementById('forms-container');
  if(!container) return;

  // Build latest-revision map for this area + scope (by formCode → latest record)
  const aForms = getFormsForArea(currentArea.id).filter(f => f.scopeKey === currentScope);
  const latestMap = {};
  aForms.forEach(f => {
    const root = f.rootFormId || f.id;
    const existing = latestMap[root];
    if(!existing || f.revision > existing.revision) latestMap[root] = f;
  });
  const submittedKey = {}; // "F01" → latestForm (any lifecycle)
  Object.values(latestMap).forEach(f => { submittedKey[f.formCode] = f; });

  // QITP reference bar
  let html = `<div class="qitp-bar">
    <span class="qitp-label">QITP Reference</span>
    <span class="qitp-ref">${cfg.qitp}</span>
  </div>
  <div class="forms-grid">`;

  cfg.forms.forEach(f => {
    const isHold = cfg.holdForms.includes(f.id);
    const existing = submittedKey[f.id];
    const avail = checkFormAvailability(f.id, currentScope, submittedKey);

    let statusBadge = '';
    let cardClass = 'form-card';
    let clickAttr = `onclick="openFormOrRegister('${f.id}','${currentScope}')"`;

    if(avail.locked){
      // Locked — show why
      cardClass += ' card-locked';
      clickAttr = `onclick="showToast('${avail.lockReason.replace(/'/g,"\'").replace(/—/g,'-')}','warn')"`;
      statusBadge = `<div class="card-status-row"><span class="status-chip status-locked">🔒 Locked</span></div>
        <div class="lock-reason">${avail.lockReason}</div>`;
    } else if(existing){
      const ls = existing.lifecycleStatus;
      const ins = existing.inspectionStatus;
      let chipClass = 'status-' + ls.toLowerCase();
      statusBadge = `<div class="card-status-row">
        <span class="status-chip ${chipClass}">${ls}</span>
        ${ins ? `<span class="status-chip status-${ins}">${ins}</span>` : ''}
        <span class="card-rev-badge">REV${String(existing.revision||0).padStart(2,'0')}</span>
      </div>`;
      if(ls === 'Submitted') cardClass += ' card-submitted';
      else if(ls === 'Draft') cardClass += ' card-draft';
      else if(ls === 'Closed') cardClass += ' card-closed';
    } else {
      statusBadge = `<div class="card-status-row"><span class="status-chip status-available">Available</span></div>`;
    }

    html += `<div class="${cardClass}${isHold?' is-hold':''}" ${clickAttr}>
      <div class="card-ref-row">
        <span class="card-ref">${f.id}</span>
        ${isHold ? `<span class="hold-badge">Hold Point</span>` : ''}
      </div>
      <div class="card-title">${f.title}</div>
      <div class="card-meta">${f.freq || ''}</div>
      ${statusBadge}
    </div>`;
  });

  html += `</div>`;
  container.innerHTML = html;
}

// ═══════════════════════════════════════════════════════
// FORM ENTRY — open a form
// ═══════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════
// FORM OPEN — route through register if history exists
// ═══════════════════════════════════════════════════════
function openFormOrRegister(formCode, scopeKey){
  const cfg = SCOPE_CONFIG[scopeKey];
  const formDef = cfg.forms.find(f => f.id === formCode);
  if(!formDef){ showToast('Form definition not found.', 'err'); return; }

  // Build submittedKey for availability check
  const aForms = getFormsForArea(currentArea.id).filter(f => f.scopeKey === scopeKey);
  const latestMap = {};
  aForms.forEach(f => {
    const root = f.rootFormId || f.id;
    const ex = latestMap[root];
    if(!ex || f.revision > ex.revision) latestMap[root] = f;
  });
  const submittedKey = {};
  Object.values(latestMap).forEach(f => { submittedKey[f.formCode] = f; });

  // Check availability / locking
  const avail = checkFormAvailability(formCode, scopeKey, submittedKey);
  if(avail.locked){
    showToast(avail.lockReason, 'warn');
    return;
  }

  const existing = aForms.filter(f => f.formCode === formCode);

  if(existing.length){
    // Show register — let user decide what to do
    currentRegisterForm = { formCode, scopeKey };
    renderRegister();
    showView('register');
  } else {
    // Nothing on record — open fresh entry immediately
    openFreshEntry(formCode, scopeKey);
  }
}

// Open a brand-new entry (no existing record)
function openFreshEntry(formCode, scopeKey){
  // Allow call with no args when coming from register's "+ New Entry" button
  if(!formCode) formCode = currentRegisterForm.formCode;
  if(!scopeKey) scopeKey = currentRegisterForm.scopeKey;

  const cfg = SCOPE_CONFIG[scopeKey];
  const formDef = cfg.forms.find(f => f.id === formCode);
  if(!formDef) return;

  currentForm = { formDef, scopeKey };
  pendingRevision = null;
  currentEditingId = null;
  currentOutcome = null;
  renderFormEntry(null, false, null);
  showView('entry');
}

// Continue an existing Draft record
function continueDraft(recordId){
  const record = forms.find(f => f.id === recordId);
  if(!record) return;
  const cfg = SCOPE_CONFIG[record.scopeKey];
  const formDef = cfg.forms.find(f => f.id === record.formCode);
  if(!formDef) return;

  currentForm = { formDef, scopeKey: record.scopeKey };
  currentEditingId = recordId;
  pendingRevision = null;
  currentOutcome = record.inspectionStatus || null;
  renderFormEntry(record.data, false, 'Draft');
  // Restore outcome button
  if(currentOutcome){
    setTimeout(() => {
      const btn = document.querySelector(`.outcome-btn.btn-${currentOutcome}`);
      if(btn) setOutcome(btn, currentOutcome);
    }, 50);
  }
  showView('entry');
}

// View a read-only submitted/closed record
function viewRecord(recordId){
  const record = forms.find(f => f.id === recordId);
  if(!record) return;
  const cfg = SCOPE_CONFIG[record.scopeKey];
  const formDef = cfg.forms.find(f => f.id === record.formCode);
  if(!formDef) return;

  currentForm = { formDef, scopeKey: record.scopeKey };
  currentEditingId = null;
  pendingRevision = null;
  currentOutcome = record.inspectionStatus || null;
  renderFormEntry(record.data, true, record.lifecycleStatus);
  showView('entry');
}

// Start a new revision off an existing Submitted record
function createRevision(rootId){
  const latest = getLatestRevision(rootId);
  if(!latest) return;
  const cfg = SCOPE_CONFIG[latest.scopeKey];
  const formDef = cfg.forms.find(f => f.id === latest.formCode);
  if(!formDef) return;

  currentForm = { formDef, scopeKey: latest.scopeKey };
  currentEditingId = null;
  currentOutcome = null;
  pendingRevision = { parentForm: latest, revision: (latest.revision||0) + 1, rootFormId: rootId };
  renderFormEntry(null, false, null);
  showView('entry');
}

// Close a submitted form record (lifecycle → Closed)
function closeFormRecord(recordId){
  const record = forms.find(f => f.id === recordId);
  if(!record) return;
  if(!confirm(`Mark this form (${record.formRef}) as Closed?\n\nClosed forms are read-only and excluded from active register counts.`)) return;
  record.lifecycleStatus = 'Closed';
  actions.push({
    id: 'ACT-' + new Date().toISOString(),
    type: 'form_closed',
    formRef: record.formRef,
    formId: record.id,
    scopeKey: record.scopeKey,
    formCode: record.formCode,
    areaId: record.areaId,
    userId: currentUser ? currentUser.id : null,
    userName: currentUser ? currentUser.name : '',
    timestamp: new Date().toISOString(),
    note: '',
  });
  saveData();
  renderRegister(); // refresh in place
}

// Discard a Draft record
function discardDraft(recordId){
  const record = forms.find(f => f.id === recordId);
  if(!record || record.lifecycleStatus !== 'Draft') return;
  if(!confirm(`Discard this draft (${record.formRef})? This cannot be undone.`)) return;
  const idx = forms.findIndex(f => f.id === recordId);
  if(idx > -1) forms.splice(idx, 1);
  saveData();
  // If nothing left, go back to forms
  const remaining = getFormsForArea(currentArea.id)
    .filter(f => f.scopeKey === currentRegisterForm.scopeKey && f.formCode === currentRegisterForm.formCode);
  if(!remaining.length){
    renderFormsView();
    showView('forms');
  } else {
    renderRegister();
  }
}

// ═══════════════════════════════════════════════════════
// REGISTER VIEW
// ═══════════════════════════════════════════════════════
function renderRegister(){
  if(!currentRegisterForm || !currentArea) return;
  const { formCode, scopeKey } = currentRegisterForm;
  const cfg = SCOPE_CONFIG[scopeKey];
  const formDef = cfg.forms.find(f => f.id === formCode);
  if(!formDef) return;

  const allRecords = getFormsForArea(currentArea.id)
    .filter(f => f.scopeKey === scopeKey && f.formCode === formCode)
    .sort((a,b) => (b.revision||0) - (a.revision||0)); // highest revision first

  // Group by root chain — identify latest in each chain
  const rootsSeen = {};
  const chains = []; // [ { latest, history:[] } ]
  const chainByRoot = {};
  allRecords.forEach(r => {
    const root = r.rootFormId || r.id;
    if(!rootsSeen[root]){
      rootsSeen[root] = true;
      const chain = { latest: r, history: [] };
      chains.push(chain);
      chainByRoot[root] = chain;
    } else {
      chainByRoot[root].history.push(r);
    }
  });

  const isHold = cfg.holdForms.includes(formCode);

  // Count active (non-closed) records
  const activeCount  = chains.filter(c => c.latest.lifecycleStatus !== 'Closed').length;
  const closedCount  = chains.filter(c => c.latest.lifecycleStatus === 'Closed').length;
  const draftCount   = chains.filter(c => c.latest.lifecycleStatus === 'Draft').length;

  let html = `
    <div class="register-form-header">
      <div class="register-form-ref">${formCode} — ${formDef.title}</div>
      <div class="register-form-context">${currentProject.code} · ${currentBlock.name} · ${currentLevel.name} · ${currentArea.name} · ${cfg.label}</div>
      ${isHold ? `<div class="hold-banner">⚑ HOLD POINT — Formal sign-off required before works may proceed</div>` : ''}
      <div class="register-summary-chips">
        ${activeCount  ? `<span class="reg-summary-chip chip-active">${activeCount} active</span>` : ''}
        ${draftCount   ? `<span class="reg-summary-chip chip-draft">${draftCount} draft</span>` : ''}
        ${closedCount  ? `<span class="reg-summary-chip chip-closed">${closedCount} closed</span>` : ''}
      </div>
    </div>`;

  if(chains.length){
    chains.forEach((chain, idx) => {
      const chainNo = chains.length > 1 ? `Chain ${idx+1}` : '';
      html += `<div class="rev-chain">`;
      if(chain.history.length){
        html += `<div class="rev-chain-label">${chainNo ? chainNo + ' — ' : ''}Revision chain: ${chain.history.length + 1} revision${chain.history.length > 0 ? 's' : ''}</div>`;
      }
      html += renderRegisterCard(chain.latest, true);
      if(chain.history.length){
        html += `<div class="rev-history">`;
        html += `<details class="rev-history-toggle">
          <summary>Show ${chain.history.length} earlier revision${chain.history.length > 1 ? 's' : ''}</summary>
          <div class="rev-history-list">`;
        chain.history.forEach(r => { html += renderRegisterCard(r, false); });
        html += `</div></details>`;
        html += `</div>`;
      }
      html += `</div>`;
    });
  } else {
    html += `<div class="register-empty">No records yet for this form.</div>`;
  }

  html += `<div class="register-new-entry">
    <button class="btn btn-primary" onclick="openFreshEntry()">+ New Form Entry</button>
  </div>`;

  const hdr = document.getElementById('register-header');
  const content = document.getElementById('register-content');
  if(hdr) hdr.innerHTML = '';
  if(content) content.innerHTML = html;
}

function renderRegisterCard(r, isLatest){
  const ls = r.lifecycleStatus;
  const ins = r.inspectionStatus;
  const rootId = r.rootFormId || r.id;
  const rev = String(r.revision || 0).padStart(2, '0');
  const savedDate  = r.savedAt      ? r.savedAt.slice(0,10) : '—';
  const submitDate = r.submittedAt  ? r.submittedAt.slice(0,10) : null;

  // Lifecycle label display
  const lsLabel = {
    'Draft':     '✎ Draft — Not yet submitted',
    'Submitted': '✔ Submitted',
    'Closed':    '✕ Closed',
  }[ls] || ls;

  // Inspection chip
  const insLabel = { pass:'✓ Pass', fail:'✗ Fail', hold:'⊘ Hold' }[ins] || ins;

  // Action buttons — clearly labelled for each state
  let actBtns = '';
  if(ls === 'Draft'){
    if(isLatest){
      actBtns = `
        <button class="reg-btn reg-btn-primary" onclick="continueDraft('${r.id}')">✎ Continue Draft</button>
        <button class="reg-btn reg-btn-ghost"   onclick="viewRecord('${r.id}')">View</button>
        <button class="reg-btn reg-btn-danger"  onclick="discardDraft('${r.id}')">Discard Draft</button>`;
    } else {
      actBtns = `<button class="reg-btn reg-btn-ghost" onclick="viewRecord('${r.id}')">View</button>`;
    }
  } else if(ls === 'Submitted'){
    if(isLatest){
      actBtns = `
        <button class="reg-btn reg-btn-ghost"    onclick="viewRecord('${r.id}')">View Form</button>
        <button class="reg-btn reg-btn-primary"  onclick="createRevision('${rootId}')">Create Revision</button>
        <button class="reg-btn reg-btn-ghost"    onclick="closeFormRecord('${r.id}')">Mark Closed</button>`;
    } else {
      actBtns = `<button class="reg-btn reg-btn-ghost" onclick="viewRecord('${r.id}')">View</button>`;
    }
  } else if(ls === 'Closed'){
    actBtns = `<button class="reg-btn reg-btn-ghost" onclick="viewRecord('${r.id}')">View</button>`;
  }

  // Latest badge vs revision label
  const latestBadge = isLatest
    ? `<span class="reg-latest-badge">Latest</span>`
    : `<span class="reg-prev-badge">Earlier Revision</span>`;

  return `<div class="register-card register-card-ls-${ls.toLowerCase()}${isLatest ? ' register-card-latest' : ' register-card-history'}">
    <div class="register-card-top">
      <div class="register-card-left">
        <span class="register-card-ref">${r.formRef || '—'}</span>
        <span class="register-card-revnum">REV${rev}</span>
        ${latestBadge}
      </div>
      <div class="register-card-chips">
        <span class="status-chip status-${ls.toLowerCase()}">${lsLabel}</span>
        ${ins ? `<span class="status-chip status-${ins}">${insLabel}</span>` : ''}
      </div>
    </div>
    <div class="register-card-meta">
      <span>Saved: <strong>${savedDate}</strong></span>
      ${submitDate ? `<span>Submitted: <strong>${submitDate}</strong></span>` : ''}
      <span>By: <strong>${r.submittedByName || '—'}</strong></span>
      ${r.resubmissionReason ? `<div class="register-card-reason">Revision reason: "${r.resubmissionReason}"</div>` : ''}
    </div>
    <div class="register-card-actions">${actBtns}</div>
  </div>`;
}

// ═══════════════════════════════════════════════════════
// FORM ENTRY — render
// lifecycle: null (new), 'Draft', 'Submitted', 'Closed'
// ═══════════════════════════════════════════════════════
function renderFormEntry(prefill, readOnly, lifecycle){
  if(!currentForm) return;
  const { formDef, scopeKey } = currentForm;
  const cfg = SCOPE_CONFIG[scopeKey];

  const revision = pendingRevision ? pendingRevision.revision : (prefill ? (prefill._revision || 0) : 0);
  const revStr = 'REV' + String(revision).padStart(2,'0');
  let revLabel;
  if(readOnly){
    revLabel = `<span class="rev-badge rev-badge-${lifecycle ? lifecycle.toLowerCase() : 'open'}">${revStr} — ${lifecycle || 'Open'}</span>`;
  } else if(pendingRevision){
    revLabel = `<span class="rev-badge rev-badge-revision">${revStr} — Resubmission</span>`;
  } else if(lifecycle === 'Draft'){
    revLabel = `<span class="rev-badge rev-badge-draft">${revStr} — Draft</span>`;
  } else {
    revLabel = `<span class="rev-badge">${revStr} — New</span>`;
  }

  // Context panel
  document.getElementById('entry-context').innerHTML = `
    <div class="context-panel">
      <span><strong>${currentProject.code}</strong> ${currentProject.name}</span>
      <span>Block: <strong>${currentBlock.name}</strong></span>
      <span>Level: <strong>${currentLevel.name}</strong></span>
      <span>Area: <strong>${currentArea.name}</strong></span>
      <span>Scope: <strong>${cfg.label}</strong></span>
      ${revLabel}
    </div>`;

  // Resubmission reason (if revision)
  let resubHtml = '';
  if(pendingRevision){
    resubHtml = `<div class="resub-panel">
      <label><strong>Resubmission Reason</strong> <span class="req-star">*</span></label>
      <textarea id="resub-reason" rows="2" placeholder="State reason for resubmission…"></textarea>
    </div>`;
  }

  // Form title + hold notice
  const isHold = cfg.holdForms.includes(formDef.id);
  let holdHtml = isHold ? `<div class="hold-warning">⚠️ HOLD POINT — This form requires formal sign-off before works may proceed.</div>` : '';

  document.getElementById('entry-title').innerHTML = `
    <h2>${formDef.id} — ${formDef.title}</h2>
    <p class="form-desc">${formDef.desc || ''}</p>
    ${holdHtml}
    ${resubHtml}`;

  // Sections
  const sectionsEl = document.getElementById('entry-sections');
  sectionsEl.innerHTML = '';
  (formDef.sections || []).forEach(section => {
    const secEl = document.createElement('div');
    secEl.className = 'form-section';
    secEl.innerHTML = `<div class="section-header"><span class="section-num">${section.num || ''}</span><span class="section-title">${section.title}</span></div>
      <div class="form-grid">${renderFormSection(section, prefill, readOnly)}</div>`;
    sectionsEl.appendChild(secEl);
  });

  // After DOM is built, populate table + photo data from prefill
  if(prefill){
    (formDef.sections || []).forEach(section => {
      (section.fields || []).forEach(field => {
        if(TABLE_DEFS[field.type] && prefill[field.id] && Array.isArray(prefill[field.id])){
          populateTable('tbl_' + field.type, prefill[field.id], TABLE_DEFS[field.type].cols);
        } else if(field.type === 'photo' && prefill[field.id] && Array.isArray(prefill[field.id])){
          // Restore photo previews and hidden field value
          const hidden = document.getElementById('f_' + field.id);
          if(hidden){
            hidden.value = JSON.stringify(prefill[field.id]);
            if(!readOnly) refreshPhotoPreview(field.id, prefill[field.id], hidden);
          }
        }
      });
    });
  }

  // Inspection outcome panel
  const activeOutcome = readOnly ? (prefill && prefill._inspectionStatus) : null;
  document.getElementById('entry-outcome').innerHTML = `
    <div class="outcome-panel">
      <label><strong>Inspection Outcome</strong></label>
      <div class="outcome-btns">
        <button type="button" class="outcome-btn btn-pass${activeOutcome==='pass'?' active':''}" onclick="setOutcome(this,'pass')" ${readOnly?'disabled':''}>✓ Pass</button>
        <button type="button" class="outcome-btn btn-fail${activeOutcome==='fail'?' active':''}" onclick="setOutcome(this,'fail')" ${readOnly?'disabled':''}>✗ Fail</button>
        <button type="button" class="outcome-btn btn-hold${activeOutcome==='hold'?' active':''}" onclick="setOutcome(this,'hold')" ${readOnly?'disabled':''}>⊘ Hold</button>
      </div>
    </div>`;

  // Action buttons
  const actionsEl = document.getElementById('entry-action-btns');
  if(actionsEl){
    if(readOnly){
      actionsEl.innerHTML = `<button class="btn btn-back" style="width:auto" onclick="goBackFromEntry()">← Back to Register</button>`;
    } else {
      actionsEl.innerHTML = `
        <button id="save-draft-btn" class="btn btn-draft" onclick="saveDraft()">Save Draft</button>
        <button id="submit-form-btn" class="btn btn-primary btn-submit" onclick="submitEntry('Submitted')">Submit Form →</button>`;
    }
  }
}

let currentOutcome = null;
function setOutcome(btn, outcome){
  document.querySelectorAll('.outcome-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentOutcome = outcome;
}

// ═══════════════════════════════════════════════════════
// FORM SECTION RENDERING
// ═══════════════════════════════════════════════════════
function renderFormSection(section, prefill, readOnly){
  return (section.fields || []).map(field => renderField(field, prefill, readOnly)).join('');
}

function renderField(field, prefill, readOnly){
  prefill = prefill || {};
  const val = prefill[field.id] !== undefined ? prefill[field.id] : getDefaultFieldValue(field);
  const req = field.req ? '<span class="req-star">*</span>' : '';
  const hint = field.hint ? `<div class="f-hint">${field.hint}</div>` : '';
  const fullClass = field.full ? ' f-full' : '';

  // Controlled fields are locked even when the form is otherwise editable
  const locked = readOnly || (!prefill[field.id] && isControlledField(field) && !readOnly)
    ? (readOnly ? true : isControlledField(field))
    : false;
  const dis = locked ? 'disabled' : '';
  const controlledClass = isControlledField(field) && !readOnly ? ' f-controlled' : '';

  let control = '';

  // Table types — rendered separately, populated after DOM insert
  if(TABLE_DEFS[field.type]){
    const tableHtml = renderTable(field.type);
    return `<div class="f-group f-full"><label>${field.label}${req}</label>${hint}${tableHtml}</div>`;
  }

  // Photo upload field
  if(field.type === 'photo'){
    if(readOnly){
      // Show stored images
      const imgs = prefill && prefill[field.id] ? prefill[field.id] : [];
      const imgHtml = imgs.length
        ? imgs.map((src,i) => `<div class="photo-thumb"><img src="${src}" alt="Photo ${i+1}" onclick="this.closest('.photo-thumb').querySelector('img').requestFullscreen && this.closest('.photo-thumb').querySelector('img').requestFullscreen()"><span class="photo-num">Photo ${i+1}</span></div>`).join('')
        : `<div class="photo-empty">No photos attached.</div>`;
      return `<div class="f-group f-full"><label>${field.label}${req}</label>${hint}<div class="photo-gallery">${imgHtml}</div></div>`;
    }
    // Editable — show upload control
    const previewId = 'photo_preview_' + field.id;
    return `<div class="f-group f-full photo-upload-group"><label>${field.label}${req}</label>
      ${hint}
      <div class="photo-upload-notice">⚠ Photos are stored in your browser only (localStorage). For production use, these will migrate to SharePoint/cloud storage.</div>
      <div class="photo-controls">
        <label class="btn-photo-upload" for="photo_input_${field.id}">📷 Add Photo</label>
        <input type="file" id="photo_input_${field.id}" accept="image/*" multiple style="display:none" onchange="handlePhotoUpload('${field.id}',this)">
      </div>
      <div class="photo-gallery" id="${previewId}"></div>
      <input type="hidden" id="f_${field.id}" name="f_${field.id}" value="">
    </div>`;
  }

  switch(field.type){
    case 'yn':
      control = `<div class="yn-wrap" id="yn_${field.id}">
        <button type="button" class="yn-btn yn-yes${val==='yes'?' active':''}" onclick="setYN('${field.id}','yes',this)" ${dis}>Yes</button>
        <button type="button" class="yn-btn yn-no${val==='no'?' active':''}" onclick="setYN('${field.id}','no',this)" ${dis}>No</button>
        <input type="hidden" id="f_${field.id}" value="${val||''}">
      </div>`;
      break;
    case 'select': {
      const opts = (field.opts || []).map(o => `<option value="${o}"${val===o?' selected':''}>${o}</option>`).join('');
      control = `<select id="f_${field.id}" name="f_${field.id}" ${dis}><option value="">— Select —</option>${opts}</select>`;
      break;
    }
    case 'textarea':
      control = `<textarea id="f_${field.id}" name="f_${field.id}" rows="3" ${dis}>${val}</textarea>`;
      break;
    case 'date':
      control = `<input type="date" id="f_${field.id}" name="f_${field.id}" value="${val}" ${dis}>`;
      break;
    case 'number':
      control = `<input type="number" id="f_${field.id}" name="f_${field.id}" value="${val}" step="any" ${dis}>`;
      break;
    default: // text
      control = `<input type="text" id="f_${field.id}" name="f_${field.id}" value="${val}" ${dis}>`;
  }

  return `<div class="f-group${fullClass}${controlledClass}"><label for="f_${field.id}">${field.label}${req}</label>${hint}${control}</div>`;
}

function setYN(fid, val, btn){
  const wrap = btn.closest('.yn-wrap');
  wrap.querySelectorAll('.yn-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('f_'+fid).value = val;
}

// Photo upload handler — converts to base64 and stores in hidden field
function handlePhotoUpload(fieldId, input){
  const existing = document.getElementById('f_' + fieldId);
  let stored = [];
  try { stored = existing.value ? JSON.parse(existing.value) : []; } catch(e){ stored = []; }

  const files = Array.from(input.files);
  if(!files.length) return;

  // Warn if adding many photos (localStorage ~5MB limit)
  if(stored.length + files.length > 5){
    showToast('Warning: more than 5 photos may exceed browser storage limits.', 'warn');
  }

  let loaded = 0;
  files.forEach(file => {
    if(file.size > 1.5 * 1024 * 1024){ // 1.5MB per image limit
      showToast(`"${file.name}" is too large (max 1.5 MB per photo).`, 'warn');
      loaded++;
      if(loaded === files.length) refreshPhotoPreview(fieldId, stored, existing);
      return;
    }
    const reader = new FileReader();
    reader.onload = e => {
      stored.push(e.target.result);
      loaded++;
      if(loaded === files.length){
        existing.value = JSON.stringify(stored);
        refreshPhotoPreview(fieldId, stored, existing);
      }
    };
    reader.readAsDataURL(file);
  });
  input.value = ''; // reset input so same file can be re-selected
}

function refreshPhotoPreview(fieldId, imgs, hiddenInput){
  const preview = document.getElementById('photo_preview_' + fieldId);
  if(!preview) return;
  preview.innerHTML = imgs.map((src,i) => `
    <div class="photo-thumb">
      <img src="${src}" alt="Photo ${i+1}">
      <button type="button" class="photo-remove" onclick="removePhoto('${fieldId}',${i})" title="Remove">✕</button>
    </div>`).join('');
}

function removePhoto(fieldId, idx){
  const hidden = document.getElementById('f_' + fieldId);
  let stored = [];
  try { stored = hidden.value ? JSON.parse(hidden.value) : []; } catch(e){ stored = []; }
  stored.splice(idx, 1);
  hidden.value = JSON.stringify(stored);
  refreshPhotoPreview(fieldId, stored, hidden);
}

// Controlled system-filled fields — these IDs are always auto-filled from context
const AUTOFILL_USER = new Set(['inspector','supervisor_name','ajk_supervisor','supervisor','batch_supervisor','tested_by','qa_manager','ajk_rep']);
const AUTOFILL_TODAY = new Set(['date','decl_date','test_date']);

function getDefaultFieldValue(field){
  if(AUTOFILL_TODAY.has(field.id) || field.type === 'date')
    return new Date().toISOString().slice(0,10);
  if(AUTOFILL_USER.has(field.id))
    return currentUser ? currentUser.name : '';
  if(field.id === 'block')    return currentBlock ? currentBlock.name : '';
  if(field.id === 'level')    return currentLevel ? currentLevel.name : '';
  if(field.id === 'area_ref') return currentArea  ? currentArea.name  : '';
  return '';
}

// Returns true if this field is a controlled auto-fill that should be
// locked (read-only) so operatives can't accidentally overwrite context data
function isControlledField(field){
  return field.id === 'block' || field.id === 'level' || field.id === 'area_ref'
      || AUTOFILL_USER.has(field.id) || AUTOFILL_TODAY.has(field.id);
}

// ═══════════════════════════════════════════════════════
// TABLE DATA — collect and populate
// ═══════════════════════════════════════════════════════

// Collect all cell values from a rendered table into an array-of-arrays
function collectTableData(tblId){
  const tbl = document.getElementById(tblId);
  if(!tbl) return [];
  const rows = [];
  tbl.querySelectorAll('tbody tr').forEach(tr => {
    const cells = [];
    tr.querySelectorAll('td input').forEach(inp => cells.push(inp.value));
    rows.push(cells);
  });
  return rows;
}

// Populate a rendered table from stored array-of-arrays
function populateTable(tblId, data, cols){
  if(!data || !Array.isArray(data)) return;
  const tbl = document.getElementById(tblId);
  if(!tbl) return;
  const tbody = tbl.querySelector('tbody');
  if(!tbody) return;

  // Add rows if needed
  while(tbody.rows.length < data.length){
    addRow(tblId, cols.length);
  }

  data.forEach((row, ri) => {
    const tr = tbody.rows[ri];
    if(!tr) return;
    row.forEach((val, ci) => {
      const inp = tr.cells[ci] ? tr.cells[ci].querySelector('input') : null;
      if(inp) inp.value = val;
    });
  });
}

// ═══════════════════════════════════════════════════════
// FORM SAVE / SUBMIT
// ═══════════════════════════════════════════════════════

function saveDraft(){
  submitEntry('Draft');
}

// lifecycle = 'Draft' | 'Submitted'
function submitEntry(lifecycle){
  lifecycle = lifecycle || 'Submitted';
  if(!currentForm || !currentArea) return;
  const { formDef, scopeKey } = currentForm;

  // Resubmission reason required for revisions being submitted (not just drafted)
  let resubReason = '';
  if(pendingRevision && lifecycle === 'Submitted'){
    const rrEl = document.getElementById('resub-reason');
    resubReason = rrEl ? rrEl.value.trim() : '';
    if(!resubReason){ showToast('Please state the reason for resubmission.', 'warn'); return; }
  } else if(pendingRevision){
    const rrEl = document.getElementById('resub-reason');
    resubReason = rrEl ? rrEl.value.trim() : '';
  }

  // Collect all field values including tables
  const data = {};
  const allFields = (formDef.sections || []).flatMap(s => s.fields || []);
  allFields.forEach(field => {
    if(TABLE_DEFS[field.type]){
      // Serialise table: collect all cell inputs
      data[field.id] = collectTableData('tbl_' + field.type);
    } else if(field.type === 'photo'){
      // Parse stored base64 array from hidden field
      const el = document.getElementById('f_' + field.id);
      if(el){
        try { data[field.id] = el.value ? JSON.parse(el.value) : []; }
        catch(e){ data[field.id] = []; }
      }
    } else {
      const el = document.getElementById('f_' + field.id);
      if(el) data[field.id] = el.value;
    }
  });

  // If continuing a draft — update in place rather than creating new record
  if(currentEditingId && lifecycle === 'Draft'){
    const existing = forms.find(f => f.id === currentEditingId);
    if(existing){
      existing.data = data;
      existing.inspectionStatus = currentOutcome || null;
      existing.savedAt = new Date().toISOString();
      saveData();
      showToast('Draft saved.', 'ok');
      return;
    }
  }

  // If continuing a draft and now submitting — upgrade it
  if(currentEditingId && lifecycle === 'Submitted'){
    const existing = forms.find(f => f.id === currentEditingId);
    if(existing){
      existing.lifecycleStatus = 'Submitted';
      existing.data = data;
      existing.inspectionStatus = currentOutcome || null;
      existing.submittedAt = new Date().toISOString();
      existing.submittedBy = currentUser ? currentUser.id : null;
      existing.submittedByName = currentUser ? currentUser.name : '';
      logAction('form_submitted', existing);
      saveData();
      showToast(`Submitted — ${existing.formRef}`, 'ok');
      resetEntryState();
      renderFormsView();
      showView('forms');
      return;
    }
  }

  // Create new record
  const revision  = pendingRevision ? pendingRevision.revision : 0;
  const systemId  = generateSystemFormId();
  const formRef   = generateFormReference(currentProject, currentBlock, currentLevel, currentArea, formDef.id, revision);
  const rootId    = pendingRevision ? pendingRevision.rootFormId : systemId;
  const now       = new Date().toISOString();

  const record = {
    id: systemId,
    formRef,
    rootFormId: rootId,
    parentFormId: pendingRevision ? pendingRevision.parentForm.id : null,
    revision,
    resubmissionReason: resubReason,
    // Context
    projectId:  currentProject.id,
    blockId:    currentBlock.id,
    levelId:    currentLevel.id,
    areaId:     currentArea.id,
    scopeKey,
    formCode:   formDef.id,
    formTitle:  formDef.title,
    // Lifecycle
    lifecycleStatus:  lifecycle,
    inspectionStatus: currentOutcome || null,
    // Meta
    submittedBy:     currentUser ? currentUser.id   : null,
    submittedByName: currentUser ? currentUser.name : '',
    submittedAt:     lifecycle === 'Submitted' ? now : null,
    savedAt:         now,
    // Form data payload (includes serialised tables)
    data,
  };

  forms.push(record);
  logAction(lifecycle === 'Submitted' ? 'form_submitted' : 'form_saved_draft', record);
  saveData();

  if(lifecycle === 'Submitted'){
    showToast(`Submitted — ${formRef}`, 'ok');
    resetEntryState();
    renderFormsView();
    showView('forms');
  } else {
    showToast(`Draft saved — ${formRef}`, 'ok');
    // Update currentEditingId so further saves update in place
    currentEditingId = systemId;
  }
}

function resetEntryState(){
  currentForm = null;
  pendingRevision = null;
  currentOutcome = null;
  currentEditingId = null;
}

function logAction(type, record){
  actions.push({
    id:        'ACT-' + new Date().toISOString(),
    type,
    formRef:   record.formRef,
    formId:    record.id,
    scopeKey:  record.scopeKey,
    formCode:  record.formCode,
    areaId:    record.areaId,
    userId:    currentUser ? currentUser.id   : null,
    userName:  currentUser ? currentUser.name : '',
    timestamp: new Date().toISOString(),
    note:      record.resubmissionReason ? `Resubmission: ${record.resubmissionReason}` : '',
  });
}

// ─── Toast notifications ──────────────────────────────
function showToast(msg, type){
  let toast = document.getElementById('app-toast');
  if(!toast){
    toast = document.createElement('div');
    toast.id = 'app-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = 'app-toast app-toast-' + (type || 'ok');
  toast.classList.add('app-toast-show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('app-toast-show'), 3200);
}

// ═══════════════════════════════════════════════════════
// OVERVIEW STATS
// ═══════════════════════════════════════════════════════
function renderOverview(){
  if(!currentProject){ showView('projects'); return; }
  updateBreadcrumb();

  const projectForms = forms.filter(f => f.projectId === currentProject.id);
  const total = projectForms.length;
  const submitted = projectForms.filter(f => f.lifecycleStatus === 'Submitted').length;
  const passes = projectForms.filter(f => f.inspectionStatus === 'pass').length;
  const fails = projectForms.filter(f => f.inspectionStatus === 'fail').length;
  const holds = projectForms.filter(f => f.inspectionStatus === 'hold').length;

  const el = document.getElementById('overview-stats');
  if(el) el.innerHTML = `
    <div class="stats-grid">
      <div class="stat-card"><div class="stat-num">${total}</div><div class="stat-label">Total Submissions</div></div>
      <div class="stat-card stat-card-pass"><div class="stat-num">${passes}</div><div class="stat-label">Pass</div></div>
      <div class="stat-card stat-card-fail"><div class="stat-num">${fails}</div><div class="stat-label">Fail</div></div>
      <div class="stat-card stat-card-hold"><div class="stat-num">${holds}</div><div class="stat-label">Hold</div></div>
    </div>
    <div class="recent-list">
      <h3>Recent Submissions</h3>
      ${projectForms.slice(-20).reverse().map(f => `
        <div class="recent-item">
          <span class="recent-ref">${f.formRef}</span>
          <span class="recent-title">${f.formTitle}</span>
          <span class="recent-by">${f.submittedByName}</span>
          <span class="recent-date">${f.submittedAt ? f.submittedAt.slice(0,10) : ''}</span>
          ${f.inspectionStatus ? `<span class="status-chip status-${f.inspectionStatus}">${f.inspectionStatus}</span>` : ''}
        </div>`).join('')}
    </div>`;

  showView('overview');
}

// ═══════════════════════════════════════════════════════
// ACTIONS VIEW
// ═══════════════════════════════════════════════════════
function goToActions(){
  renderActionCards();
  showView('actions');
}
function renderActionCards(){
  const list = document.getElementById('action-list');
  if(!list) return;
  const projectActions = currentProject
    ? actions.filter(a => {
        const f = forms.find(fr => fr.id === a.formId);
        return f && f.projectId === currentProject.id;
      })
    : actions;
  if(!projectActions.length){
    list.innerHTML = '<p class="empty-msg">No actions recorded.</p>';
    return;
  }
  list.innerHTML = projectActions.slice(-50).reverse().map(a => `
    <div class="action-item">
      <span class="action-type">${a.type.replace(/_/g,' ')}</span>
      <span class="action-ref">${a.formRef || ''}</span>
      <span class="action-user">${a.userName}</span>
      <span class="action-time">${a.timestamp ? a.timestamp.slice(0,16).replace('T',' ') : ''}</span>
      ${a.note ? `<span class="action-note">${a.note}</span>` : ''}
    </div>`).join('');
}

// ═══════════════════════════════════════════════════════
// BREADCRUMB
// ═══════════════════════════════════════════════════════
function updateBreadcrumb(){
  const bc = document.getElementById('breadcrumb');
  if(!bc) return;
  const parts = [];
  if(currentProject) parts.push(`<span class="bc-item bc-link" onclick="selectProject('${currentProject.id}')">${currentProject.code}</span>`);
  if(currentBlock)   parts.push(`<span class="bc-item bc-link" onclick="selectBlock('${currentBlock.id}')">${currentBlock.code}</span>`);
  if(currentLevel)   parts.push(`<span class="bc-item bc-link" onclick="selectLevel('${currentLevel.id}')">${currentLevel.code}</span>`);
  if(currentArea)    parts.push(`<span class="bc-item bc-link" onclick="selectArea('${currentArea.id}')">${currentArea.code}</span>`);
  if(currentScope)   parts.push(`<span class="bc-item">${SCOPE_CONFIG[currentScope]?.label || currentScope}</span>`);
  bc.innerHTML = parts.length ? parts.join('<span class="bc-sep">›</span>') : '';
}

// ═══════════════════════════════════════════════════════
// BACK NAVIGATION
// ═══════════════════════════════════════════════════════
// Navigate back from entry form (used by read-only back button and goBack)
function goBackFromEntry(){
  resetEntryState();
  if(currentRegisterForm){
    renderRegister();
    showView('register');
  } else {
    renderFormsView();
    showView('forms');
  }
}

function goBack(){
  // Determine current depth by what is set
  // Deepest first: entry → register → forms → scope → area → level → block → project → login
  const activeView = document.querySelector('.view.active');
  const activeId = activeView ? activeView.id : '';

  if(activeId === 'view-entry'){
    // Navigating back from an open/edit form
    goBackFromEntry();
  } else if(activeId === 'view-register'){
    // Going back from register → forms
    currentRegisterForm = null;
    renderFormsView();
    showView('forms');
  } else if(activeId === 'view-forms' || currentScope){
    // Going back from forms → scope selection
    currentScope = null;
    renderScopeCards();
    showView('scope');
  } else if(currentArea){
    // Going back from scope selection → areas
    currentArea = null;
    renderAreaCards();
    showView('areas');
  } else if(currentLevel){
    currentLevel = null;
    renderLevelCards();
    showView('levels');
  } else if(currentBlock){
    currentBlock = null;
    renderBlockCards();
    showView('blocks');
  } else if(currentProject){
    currentProject = null;
    renderProjectCards();
    showView('projects');
  } else {
    showView('login');
  }
}

// ═══════════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  populateUserSelect();
  showView('login');
});
