    // AlanBecker作品数据文件
    // - series: 系列名称
    // - title: 作品标题
    // - date: 发布时间
    // - staff: 制作人员对象，包含多个职位类别
    // - description: 作品描述（可选）

    const ABFFData = [
  
    ];

    // 导出所有可能的职位类型（用于筛选）
    export const allRoles = Array.from(
      new Set(
    ABFFData.flatMap(work => Object.keys(work.
    staff))
      )
    );

    export default ABFFData;