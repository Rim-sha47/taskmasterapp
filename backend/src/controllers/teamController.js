const supabase = require("../config/supabase");

exports.getMembers = async (req, res) => {
  const { data, error } =
    await supabase.from("team_members").select("*");

  if (error)
    return res.status(500).json({ error });

  res.json({ data });
};

exports.createMember = async (req, res) => {
  const { name, email, designation, status } =
    req.body;

  const { data, error } =
    await supabase
      .from("team_members")
      .insert([
        {
          name,
          email,
          designation,
          status,
        },
      ])
      .select();

  if (error)
    return res.status(500).json({ error });

  res.json({ data });
};

exports.updateMember = async (req, res) => {
  const { id } = req.params;

  const { data, error } =
    await supabase
      .from("team_members")
      .update(req.body)
      .eq("id", id)
      .select();

  if (error)
    return res.status(500).json({ error });

  res.json({ data });
};

exports.deleteMember = async (req, res) => {
  const { id } = req.params;

  const { error } =
    await supabase
      .from("team_members")
      .delete()
      .eq("id", id);

  if (error)
    return res.status(500).json({ error });

  res.json({
    success: true,
  });
};