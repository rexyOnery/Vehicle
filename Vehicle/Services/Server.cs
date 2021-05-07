using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Threading.Tasks;
using Vehicle.Models;

namespace Vehicle.Services
{
    public class Server
    {
        internal static async Task<T> FindById<T>(int id) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                return await _context.Set<T>().FindAsync(id);
            }
        }

        internal static async Task<List<T>> GetUserData<T>() where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                return await _context.Set<T>().ToListAsync();
            }
        }

        internal static int AddUsers<T>(Vitsuser model) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                try
                {
                    var _take = _context.Vitsusers
                        .Where(c => c.AgentId.Equals(model.AgentId))
                        .Count();

                    _context.Vitsusers.Add(model);
                    _context.SaveChanges();


                    var _taker = _context.Vitsusers
                        .Where(c => c.AgentId.Equals(model.AgentId))
                        .Skip(_take);

                    return _taker.FirstOrDefault().Id;
                }
                catch { return 0; }
            }
        }

        internal static async Task<List<Vitsitem>> PostItems<T>(Vitsitem model) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                RandomGenerator generator = new RandomGenerator();
                int _tag = generator.RandomNumber(1000, 9999);

                model.TagNumber = _tag.ToString();
                _context.Vitsitems.Add(model);
                _context.SaveChanges();


                return await _context.Vitsitems
                    .Where(c => c.VitsuserId.Equals(model.VitsuserId))
                    .ToListAsync();
            }
        }

        internal static List<UserItems> GetAllPendingAsync(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Select(c => new
                {
                    c.Id,
                    c.AgentId,
                    c.FirstName,
                    c.LastName,
                    c.Phone,
                    c.State,
                    c.City,
                    c.Pix
                })
                    .Where(c => c.AgentId.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    if (!_context.Vitsitems.Any(c => c.VitsuserId.Equals(i.Id)))
                    {
                        UserItems userItems1 = new UserItems
                        {
                            Id = i.Id,
                            FirstName = i.FirstName,
                            LastName = i.LastName,
                            Phone = i.Phone,
                            Pix = i.Pix,
                            State = i.State,
                            City = i.City,
                            AgentId = (int)i.AgentId
                        };
                        userItems.Add(userItems1);
                    }


                }
                return userItems;
            }
        }

        internal static bool ChangePassword<T>(Agent account) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var user = _context.Agents
                    .Where(c => c.ConfirmationCode == account.ConfirmationCode);

                if (user.Count() > 0)
                {
                    string passwordHash;
                    PasswordHashing.CreatePasswordHash(account.Password, out passwordHash);
                    user.FirstOrDefault().Password = passwordHash;
                    user.FirstOrDefault().ConfirmationCode = "-";
                    _context.SaveChanges();

                    return true;
                }

                return false;

            }
        }

        internal static List<UserItems> GetAgentClient<T>(int id) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Select(user => new
                {
                    id = user.Id,
                    firstname = user.FirstName,
                    lastname = user.LastName,
                    phone = user.Phone,
                    photo = user.Pix,
                    state = user.State,
                    city = user.City,
                    address = user.Address,
                    agent = user.AgentId
                })
                    .Where(c => c.agent.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        State = i.state,
                        City = i.city,
                        Address = i.address,
                        Photo = i.photo,
                        AgentName = _context.Agents.Find(i.agent).FirstName + " " + _context.Agents.Find(i.agent).LastName
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetPendingAsync(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Select(c => new
                {
                    c.Id,
                    c.AgentId,
                    c.FirstName,
                    c.LastName,
                    c.Phone,
                    c.State,
                    c.City,
                    c.Pix
                })
                    .ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    if (!_context.Vitsitems.Any(c => c.VitsuserId.Equals(i.Id)))
                    {
                        UserItems userItems1 = new UserItems
                        {
                            Id = i.Id,
                            FirstName = i.FirstName,
                            LastName = i.LastName,
                            Phone = i.Phone,
                            Pix = i.Pix,
                            State = i.State,
                            City = i.City,
                            AgentId = (int)i.AgentId
                        };
                        userItems.Add(userItems1);
                    }


                }
                return userItems;
            }
        }

        internal static async Task<List<UserItems>> SearchAsync<T>(string search)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 photo = items.Photo,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.tag.Equals(search) && c.paid.Equals(true)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        Photo = i.photo
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static async Task<List<UserItems>> AdminSearchAsync<T>(string search)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 photo = items.Photo,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.tag.Equals(search)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        Photo = i.photo
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetAllAgentUsersAsync(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 agentid = user.AgentId,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.agentid.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetAllAgentClentsAsync(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers
                    .Select(user => new
                    {
                        id = user.Id,
                        agentid = user.AgentId,
                        firstname = user.FirstName,
                        lastname = user.LastName,
                        phone = user.Phone,
                        state = user.State,
                        city = user.City,
                        pix = user.Pix
                    })
                    .Where(c => c.agentid.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        State = i.state,
                        City = i.city,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetAllAgentUsersAsync()
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 agentid = user.AgentId,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             }).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<UserItems> GetAllUsersAsync()
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 agentid = user.AgentId,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             }).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        AgentId = (int)i.agentid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }
        internal static List<UserItems> GetAllForAdminAsync()
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Agents.Select(user => new
                {
                    id = user.Id,
                    firstname = user.FirstName,
                    lastname = user.LastName,
                    phone = user.Phone,
                    photo = user.Photo,
                    disabled = user.Disabled
                    //expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                }).ToList();
                //.Where(c => c.agentid.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Photo = i.photo,
                        Expired = i.disabled == true ? "Disabled" : "Active"
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static List<DashItems> GetAdminDashBoardInfoAsync()
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var allCount = _context.Vitsusers.Count();
                var active = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 agent = user.AgentId,
                                                 paid = items.Paid,
                                                 thimonth = Convert.ToDateTime(items.AgentMonth).Month + "/" + Convert.ToDateTime(items.AgentMonth).Year,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.paid.Equals(true));

                var _active = 0;
                foreach (var i in active)
                {
                    var _month = DateTime.Now.Month + "/" + DateTime.Now.Year;
                    if (i.expired.Equals("Not Expired") && i.thimonth.Equals(_month))
                    {
                        _active += 1;
                    }
                }

                var _money = 0.8 * _active * 1000;

                DashItems dashItems = new DashItems
                {
                    Accrued = Convert.ToInt32(_money).ToString(),
                    ActiveCustomers = _active.ToString(),
                    Customers = allCount.ToString()
                };
                List<DashItems> _dashItems = new List<DashItems>();
                _dashItems.Add(dashItems);
                return _dashItems.ToList();
            }
        }


        internal static List<DashItems> GetDashBoardInfoAsync(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var allCount = _context.Vitsusers.Where(c => c.AgentId.Equals(id)).Count();
                var active = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 agent = user.AgentId,
                                                 paid = items.Paid,
                                                 thimonth = Convert.ToDateTime(items.AgentMonth).Month + "/" + Convert.ToDateTime(items.AgentMonth).Year,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.agent.Equals(id) && c.paid.Equals(true));

                var _active = 0;
                foreach (var i in active)
                {
                    var _month = DateTime.Now.Month + "/" + DateTime.Now.Year;
                    if (i.expired.Equals("Not Expired") && i.thimonth.Equals(_month))
                    {
                        _active += 1;
                    }
                }

                var _money = 0.2 * _active * 1000;

                var _payment = _context.Payments
                    .Where(c => c.AgentId.Equals(id) && c.Paid.Equals(true))
                    .Sum(c => Convert.ToDouble(c.Amount));

                var _realMoney = Convert.ToInt32(_money - _payment);
                DashItems dashItems = new DashItems
                {
                    Accrued = _realMoney.ToString(),
                    ActiveCustomers = _active.ToString(),
                    Customers = allCount.ToString()
                };
                List<DashItems> _dashItems = new List<DashItems>();
                _dashItems.Add(dashItems);
                return _dashItems.ToList();
            }
        }

        internal static async Task<List<UserItems>> GetUserItemsAsync<T>(int id) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {

                var result = _context.Vitsusers.Join(_context.Vitsitems,
                                             e => e.Id,
                                             d => d.VitsuserId,
                                             (user, items) => new
                                             {
                                                 id = user.Id,
                                                 firstname = user.FirstName,
                                                 lastname = user.LastName,
                                                 phone = user.Phone,
                                                 state = user.State,
                                                 city = user.City,
                                                 pix = user.Pix,
                                                 address = user.Address,
                                                 agentName = user.AgentId,
                                                 agentPhone = user.Agent.Phone,
                                                 item = items.ItemType,
                                                 tag = items.TagNumber,
                                                 paid = items.Paid,
                                                 itemid = items.Id,
                                                 chasis = items.ChasisNumber,
                                                 plate = items.PlateNumber,
                                                 photo = items.Photo,
                                                 expired = Convert.ToDateTime(items.RegisteredDate) >= DateTime.Now ? "Not Expired" : "Expired"
                                             })
                    .Where(c => c.id.Equals(id)).ToList();

                List<UserItems> userItems = new List<UserItems>();
                foreach (var i in result)
                {
                    UserItems userItems1 = new UserItems
                    {
                        Id = i.id,
                        FirstName = i.firstname,
                        LastName = i.lastname,
                        Phone = i.phone,
                        Pix = i.pix,
                        ItemType = i.item,
                        TagNumber = i.tag,
                        Paid = (bool)i.paid,
                        Expired = i.expired,
                        State = i.state,
                        City = i.city,
                        ItemId = i.itemid,
                        Address = i.address,
                        AgentName = _context.Agents.Find(i.agentName).FirstName + " " + _context.Agents.Find(i.agentName).LastName,
                        AgentPhone = _context.Agents.Find(i.agentName).Phone,
                        Chasis = i.chasis,
                        Plate = i.plate,
                        Photo = i.photo
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        public static void RemoveUsersAsync(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var _iSearch = _context.Vitsusers
                    .Find(id);
                if (_iSearch != null)
                {
                    _context.Vitsusers.Remove(_iSearch);
                    _context.SaveChanges();
                }
            }
        }

        internal static async Task<bool> AddAgent<T>(Agent account) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var user = _context.Agents
                    .Where(c => c.LoginName == account.LoginName);

                if (user.Count() == 0)
                {
                    string passwordHash;
                    PasswordHashing.CreatePasswordHash(account.Password, out passwordHash);
                    account.Password = passwordHash;

                    _context.Agents.Add(account);
                    await _context.SaveChangesAsync();

                    return true;
                }

                return false;

            }
        }

        internal static List<Agent> Login<T>(Agent account) where T : class
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var _user = _context.Agents.Where(c => c.LoginName.Equals(account.LoginName));

                if (!PasswordHashing.VerifyPasswordHash(account.Password, _user.FirstOrDefault().Password))
                {
                    List<Agent> agents = new List<Agent>();
                    Agent _agent = new Agent
                    {
                        FirstName = "User not found"
                    };
                    agents.Add(_agent);
                    return agents;
                }
                else
                {
                    return _user.ToList();
                }
            }
        }

        public static async Task<List<Vitsitem>> SearchTags(string tag)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var _tagSearch = await _context.Vitsitems
                    .Where(x => x.TagNumber == tag && x.Paid.Equals(true))
                    .Select(x => TagDTO(x))
                    .ToListAsync();

                return _tagSearch;
            }
        }

        internal static async Task<int> SetPayment(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                try
                {
                    var _tagSearch = _context.Vitsitems.Find(id);

                    _tagSearch.Paid = true;
                    _tagSearch.AgentMonth = DateTime.Now.ToShortDateString();
                    _tagSearch.RegisteredDate = DateTime.Now.AddYears(1).ToLongDateString();
                    _context.SaveChanges();
                    return 1;
                }
                catch
                {
                    return 0;
                }
            }
        }

        internal static int CheckOuntCount()
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                try { return _context.Payments.Where(c => c.Paid.Equals(false)).Count(); } catch { return 0; }
            }
        }


        internal static List<PayItems> GetCashouts()
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var result = _context.Agents.Join(_context.Payments,
                                             e => e.Id,
                                             d => d.AgentId,
                                             (user, pay) => new
                                             {
                                                 user.FirstName,
                                                 user.LastName,
                                                 pay.DatePaid,
                                                 pay.Amount,
                                                 pay.Paid,
                                                 pay.Id
                                             })
                     .Where(c => c.Paid.Equals(false)).ToList();

                List<PayItems> userItems = new List<PayItems>();
                foreach (var i in result)
                {
                    PayItems userItems1 = new PayItems
                    {
                        Id = i.Id,
                        Name = i.FirstName + " " + i.LastName,
                        Date = i.DatePaid,
                        Amount = i.Amount,
                        Paid = (bool)i.Paid
                    };
                    userItems.Add(userItems1);

                }
                return userItems;
            }
        }

        internal static void SetPaid(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var _pay = _context.Payments.Find(id);
                _pay.DatePaid = DateTime.Now.ToShortDateString();
                _pay.Paid = true;
                _context.SaveChanges();
            }
        }

        internal static void EnableAgent(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var _pay = _context.Agents.Find(id);
                _pay.Disabled = false;
                _context.SaveChanges();
            }
        }

        internal static void DisableAgent(int id)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                var _pay = _context.Agents.Find(id);
                _pay.Disabled = true;
                _context.SaveChanges();
            }
        }

        internal static bool CashingOut(int AgentId, string Amount)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                try
                {
                    var paye = _context.Payments.Where(c => c.AgentId.Equals(AgentId) && c.Paid.Equals(false));
                    if (!paye.Any())
                    {
                        Payment pay = new Payment
                        {
                            AgentId = AgentId,
                            Amount = Amount,
                            DatePaid = DateTime.Now.ToShortDateString(),
                            Paid = false
                        };

                        _context.Payments.Add(pay);
                        _context.SaveChanges();
                        return true;
                    }
                }
                catch
                {
                    return false;
                }
                return false;
            }
        }

        internal static async Task<bool> RecoverPassword(string email)
        {
            using (var _context = new DB_A4DA38_VITSContext())
            {
                RandomGenerator generator = new RandomGenerator();
                string str = generator.RandomString(10, false);


                MailMessage m = new MailMessage();
                SmtpClient sc = new SmtpClient();

                var url = "http://lockuptag.com/account/confirmcode";
                string myString = "";
                myString += "<h1>LockUp Tag Password Recovery</h1><hr/>";
                myString += "<b>Confirmation Code: " + str + "</b><br />";
                myString += " <a href='" + url + "'> Click here to recover your password</a>";

                m.From = new MailAddress("recovery@lockuptag.com");
                m.To.Add(email);
                m.Subject = "LockUp Tag Password Recovery";
                m.Body = myString.ToString();
                m.IsBodyHtml = true;
                sc.Host = "mail.lockuptag.com";
                 
                string str1 = "gmail.com";
                string str2 = email.ToLower();
                if (str2.Contains(str1))
                {
                    try
                    {
                        sc.Port = 587;
                        sc.Credentials = new System.Net.NetworkCredential("recovery@lockuptag.com", "Luckopt@g@1");
                        sc.EnableSsl = false;
                        sc.Send(m);
                        var user = _context.Agents.FirstOrDefault(c => c.LoginName.Equals(email));

                        if (user != null)
                        {
                            user.ConfirmationCode = str;

                            _context.Agents.Update(user);
                            _context.SaveChanges();
                        }
                    }
                    catch (Exception ex)
                    {
                        //Response.Write("<BR><BR>* Please double check the From Address and Password to confirm that both of them are correct. <br>");
                        //Response.Write("<BR><BR>If you are using gmail smtp to send email for the first time, please refer to this KB to setup your gmail account: http://www.smarterasp.net/support/kb/a1546/send-email-from-gmail-with-smtp-authentication-but-got-5_5_1-authentication-required-error.aspx?KBSearchID=137388");
                        //Response.End();
                        throw ex;
                    }
                }
                else
                {
                    try
                    {
                        sc.Port = 25;
                        sc.Credentials = new System.Net.NetworkCredential("recovery@lockuptag.com", "Luckopt@g@1");
                        sc.EnableSsl = false;
                        sc.Send(m);
                        var user = _context.Agents.FirstOrDefault(c => c.LoginName.Equals(email));

                        if (user != null)
                        {
                            user.ConfirmationCode = str;

                            _context.Agents.Update(user);
                            _context.SaveChanges();
                        }

                    }
                    catch (Exception ex)
                    {
                        //Response.Write("<BR><BR>* Please double check the From Address and Password to confirm that both of them are correct. <br>");
                        //Response.End();
                        throw ex;
                    }
                }



                return true;

            }
        }

        private static Vitsitem TagDTO(Vitsitem user) =>
       new Vitsitem
       {
           ChasisNumber = user.ChasisNumber,
           ItemType = user.ItemType,
           Photo = user.Photo,
           PlateNumber = user.PlateNumber,
           TagNumber = user.TagNumber
       };
    }
}
